<template>
  <div class="flex flex-col gap-3 h-full">
    <Return name="article" message="文章操作"></Return>
    <a-form ref="formRef" :model="formState">
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>
    </a-form>
    <div
      :class="[
        'overflow-hidden border rounded-lg grow flex flex-col',
        !isMobile ? '' : 'flex-col-reverse gap-2',
      ]"
    >
      <template v-if="rerend">
        <Toolbar
          class="border-b"
          :editor="editorRef"
          :defaultConfig="!isMobile ? toolbarConfigDefault : toolbarConfigSimple"
          :mode="!isMobile ? 'default' : 'simple'"
        />
        <Editor
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="!isMobile ? 'default' : 'simple'"
          @on-created="btnFn.handleCreated"
        />
      </template>
    </div>
    <div class="bg-white flex gap-2 p-2">
      <router-link :to="{ name: 'article' }">
        <a-button>返回</a-button>
      </router-link>
      <a-button type="primary" @click="btnFn.save">暂存</a-button>
      <a-button type="primary" @click="btnFn.save">保存并返回</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Return from '@/components/Return/index.vue';
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import ArticleApi from '@/api/article';
  import { notification } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { Return, Editor, Toolbar },
    setup() {
      const shallow = shallowReactive({
        editorRef: null as any,
        formRef: null as any,
      });
      const state = reactive({
        valueHtml: '<p>hello</p>',
        formState: {
          title: '' as string,
        },
        isMobile: false,
        rerend: true,
      });

      const router = useRouter();

      const noState = {
        toolbarConfigSimple: {
          excludeKeys: [
            'bulletedList',
            'numberedList',
            'todo',
            'insertTable',
            'codeBlock',
            'clearStyle',
            'blockquote',
            'header1',
            'header2',
            'header3',
            'bold',
            'underline',
            'italic',
            'through',
            'color',
            'bgColor',
          ],
        },
        toolbarConfigDefault: {},
        editorConfig: '请输入内容...',
      };

      // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = shallow.editorRef;
        if (editor == null) return;
        editor.destroy();
        window.removeEventListener('resize', checkScreenSize);
      });

      const btnFn = {
        handleCreated: (editor: any) => {
          shallow.editorRef = editor; // 记录 editor 实例，重要！
        },
        save: () => {
          return new Promise<void>((resolve) => {
            shallow.formRef.validate().then(() => {
              ArticleApi.add({ title: state.formState.title, content: shallow.editorRef.getHtml() })
                .then(() => {
                  notification.success({ message: '保存成功' });
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

      const checkScreenSize = () => {
        if (state.isMobile === window.innerWidth < 640) return;

        state.isMobile = window.innerWidth < 640;
        state.rerend = false;
        nextTick(() => {
          state.rerend = true;
        });
      };

      onMounted(() => {
        window.addEventListener('resize', checkScreenSize);
      });

      return {
        ...toRefs(shallow),
        ...toRefs(state),
        ...noState,
        btnFn,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
  }
</style>
