<template>
  <div class="flex flex-col gap-3 h-full overflow-hidden">
    <a-form ref="formRef" :model="formState" class="grow overflow-auto">
      <div class="flex flex-col gap-2 h-full">
        <div class="">
          <a-card size="small">
            <div class="flex gap-2">
              <a-form-item
                label="名称"
                name="name"
                class="grow"
                :rules="{ required: true, message: '请输入名称' }"
              >
                <a-input v-model:value="formState.name" placeholder="请输入名称" />
              </a-form-item>
              <a-form-item label="色号" name="rgb" class="grow">
                <a-input v-model:value="formState.rgb" placeholder="请输入色号" />
              </a-form-item>
            </div>
            <a-form-item label="介绍" name="abstract">
              <a-textarea v-model:value="formState.abstract" placeholder="请输入介绍" autoSize />
            </a-form-item>
            <a-form-item label="图片" name="livePic">
              <PicUpload v-model:value="formState.livePic" />
            </a-form-item>
          </a-card>
        </div>
        <div class="border-r border-slate-200"></div>
        <div class="h-full pl-2 grow">
          <div
            class="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
          >
            <a-card
              v-for="(item, index) in formState.items"
              :key="index"
              size="small"
              :title="`词条 ${index + 1}`"
            >
              <template #extra>
                <svg-icon
                  icon-class="trash"
                  class="cursor-pointer"
                  @click="btnFn.removeUser(item)"
                />
              </template>
              <div class="flex gap-2">
                <a-form-item :name="['items', index, 'name']" label="名称" class="w-1/2">
                  <a-input v-model:value="item.name" placeholder="请输入名称" />
                </a-form-item>
                <a-form-item :name="['items', index, 'isFirst']" label="第一次出现" class="w-1/2">
                  <a-switch v-model:checked="item.isFirst" />
                </a-form-item>
              </div>
              <div class="flex gap-2">
                <a-form-item :name="['items', index, 'author']" label="作者" class="w-1/2">
                  <a-input v-model:value="item.author" placeholder="请输入作者" />
                </a-form-item>
                <a-form-item :name="['items', index, 'time']" label="时间" class="w-1/2">
                  <a-input v-model:value="item.time" placeholder="请输入时间" />
                </a-form-item>
              </div>
              <a-form-item :name="['items', index, 'origin']" label="内容">
                <a-input v-model:value="item.origin" placeholder="请输入内容" />
              </a-form-item>
              <a-form-item :name="['items', index, 'link']" label="链接">
                <a-input v-model:value="item.link" placeholder="请输入链接" />
              </a-form-item>
              <a-form-item :name="['items', index, 'originPic']" label="图片">
                <a-input v-model:value="item.originPic" placeholder="图片" />
              </a-form-item>
            </a-card>
          </div>
        </div>
      </div>
    </a-form>
    <div class="bg-white flex gap-2 p-2">
      <a-button type="primary" @click="btnFn.addUser">
        <div class="flex gap-2 justify-center items-center">
          <svg-icon icon-class="plus" />
          新增
        </div>
      </a-button>
      <router-link :to="{ name: 'color' }">
        <a-button>返回</a-button>
      </router-link>
      <a-button type="primary" @click="btnFn.save">保存</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, shallowReactive, toRefs } from 'vue';
  import PicUpload from '@/components/PicUpload/index.vue';

  export default defineComponent({
    components: { PicUpload },
    setup() {
      const shallow = shallowReactive({
        formRef: null as any,
      });
      const state = reactive({
        formState: { rgb: null, abstract: null, livePic: null, name: null, items: [] } as any,
      });
      const btnFn = {
        addUser: () => {
          state.formState.items.push({
            name: null,
            author: null,
            time: null,
            origin: null,
            originPic: null,
            link: null,
            isFirst: null,
          });
        },
        removeUser: (item: any) => {
          const index = state.formState.items.indexOf(item);
          if (index !== -1) {
            state.formState.items.splice(index, 1);
          }
        },
        save: () => {
          shallow.formRef.validate().then(() => {});
        },
      };
      return {
        btnFn,
        ...toRefs(state),
        ...toRefs(shallow),
      };
    },
  });
</script>
<style lang="less" scoped></style>
