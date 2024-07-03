<template>
  <div class="flex flex-col gap-3 h-full overflow-hidden">
    <a-form ref="formRef" :model="formState" class="flex flex-col gap-2">
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="背景图片" name="bgPic">
        <PicUpload :fileList="formState.bgPic" />
      </a-form-item>
      <a-form-item label="大类" name="dictP">
        <a-radio-group v-model:value="formState.dictP">
          <a-radio v-for="item in categoryTree" :key="item.id" :value="item.id">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="小类" name="dictC">
        <a-radio-group v-model:value="formState.dictC">
          <a-radio v-for="item in childTree.children" :key="item.id" :value="item.id">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <CustomEditor ref="shallowCustomEditor" />
    <div class="bg-white flex gap-2 p-2">
      <router-link :to="{ name: 'article' }">
        <a-button>返回</a-button>
      </router-link>
      <a-button type="primary" @click="btnFn.save(false)">暂存</a-button>
      <a-button type="primary" @click="btnFn.save(true)">保存并返回</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, reactive, shallowReactive, toRefs } from 'vue';
  import ArticleApi from '@/api/article';
  import { notification } from 'ant-design-vue';
  import PicUpload from '@/components/PicUpload/index.vue';
  import CustomEditor from '@/components/CustomEditor/index.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBasicStore } from '@/store/modules/basic';

  export default defineComponent({
    components: { PicUpload, CustomEditor },
    setup() {
      const route = useRoute();
      const router = useRouter();

      const categoryTree = computed(() => useBasicStore().dict.tree);
      const childTree = computed(
        () =>
          categoryTree.value[
            categoryTree.value.findIndex((e: any) => e.id === state.formState.dictP)
          ] || { children: [] }
      );

      const shallow = shallowReactive({
        shallowCustomEditor: null as any,
        formRef: null as any,
      });
      const state = reactive({
        formState: {
          title: '' as string,
          bgPic: [],
          dictP: null,
          dictC: null,
        },
      });

      const noState = {
        isEdit: false,
      };

      const btnFn = {
        save: (needBack = false) => {
          return new Promise<void>((resolve) => {
            shallow.formRef.validate().then(() => {
              const data = JSON.parse(JSON.stringify(state.formState));
              data.bgPic = JSON.stringify(data.bgPic);
              const { content, text } = shallow.shallowCustomEditor.btnFn.getData();
              data.content = content;
              data.contentStr = text;
              data.count = data.contentStr.length;

              if (noState.isEdit) data.id = route.query?.id;

              ArticleApi[noState.isEdit ? 'update' : 'add'](data)
                .then(() => {
                  notification.success({ message: `${noState.isEdit ? '编辑' : '新增'}成功` });
                  needBack && router.push({ name: 'article' });
                  resolve();
                })
                .catch(() => {});
            });
          });
        },
        saveAndBack: () => {
          btnFn.save().then(() => {
            router.push({ name: 'article' });
          });
        },
      };

      const dataFn = {
        init: () => {
          state.formState.dictP = categoryTree.value[0].id;
          noState.isEdit = !!route.query?.id;
          if (noState.isEdit) {
            ArticleApi.pfDetail({ id: route.query?.id })
              .then((res) => {
                shallow.shallowCustomEditor.btnFn.setData(res.content);
                state.formState.title = res.title;
                state.formState.bgPic = res.bgPic;
                state.formState.dictP = res.dictP;
                state.formState.dictC = res.dictC;
              })
              .catch(() => {});
          }
        },
      };
      onMounted(() => dataFn.init());

      return {
        ...toRefs(shallow),
        ...toRefs(state),
        btnFn,
        categoryTree,
        childTree,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
  }
</style>
