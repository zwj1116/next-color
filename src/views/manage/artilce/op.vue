<template>
  <div class="flex flex-col gap-3 h-full">
    <Return name="artilce" message="文章操作"></Return>
    <a-form ref="formRef" :model="formState">
      <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
        <a-input v-model:value="formState.title" />
      </a-form-item>
    </a-form>
    <div class="overflow-hidden border rounded-lg">
      <Toolbar class="border-b" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor
        v-model="valueHtml"
        style="height: 500px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        :mode="mode"
        @on-created="btnFn.handleCreated"
      />
    </div>
    <div class="bg-white flex gap-2 p-3">
      <router-link :to="{ name: 'artilce' }">
        <a-button>返回</a-button>
      </router-link>
      <a-button type="primary" @click="btnFn.save">保存</a-button>
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
      });

      const noState = {
        toolbarConfig: {},
        editorConfig: '请输入内容...',
        mode: 'default',
      };

      // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = shallow.editorRef;
        if (editor == null) return;
        editor.destroy();
      });

      const btnFn = {
        handleCreated: (editor: any) => {
          shallow.editorRef = editor; // 记录 editor 实例，重要！
        },
        save: () => {
          shallow.formRef.validate().then(() => {
            ArticleApi.add({ title: state.formState.title, content: shallow.editorRef.getHtml() })
              .then(() => {
                notification.success({ message: '保存成功' });
              })
              .catch(() => {});
          });
        },
      };

      return {
        ...toRefs(shallow),
        ...toRefs(state),
        ...noState,
        btnFn,
      };
    },
  });
</script>
<style lang="less" scoped></style>
