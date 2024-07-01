<template>
  <div
    :class="[
      'overflow-hidden border rounded-lg grow flex flex-col',
      !isMobile ? '' : 'flex-col-reverse gap-2',
    ]"
  >
    <template v-if="rerend">
      <Toolbar
        class="border-b"
        :editor="shallowEditorRef"
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
</template>
<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    reactive,
    shallowRef,
    toRefs,
    watch,
  } from 'vue';
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { useBasicStore } from '@/store/modules/basic';
  import UploadApi from '@/api/upload';
  import { MINIO } from '@/config';

  export default defineComponent({
    components: { Editor, Toolbar },
    setup() {
      const shallowEditorRef = shallowRef();
      const state = reactive({
        valueHtml: '<p>hello</p>',
        rerend: true,
      });

      const isMobile = computed(() => useBasicStore().isMobile);

      const noState = {
        isEdit: false,
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
            'insertLink',
          ],
        },
        toolbarConfigDefault: {},
        editorConfig: {
          MENU_CONF: {
            uploadImage: {
              timeout: 10 * 1000,
              maxFileSize: 10 * 1024 * 1024, // 10M
              base64LimitSize: 5 * 1024, // insert base64 format, if file's size less than 5kb
              customUpload(file: File, insertFn: any) {
                const formData = new FormData();
                formData.append('file', file);

                UploadApi.image(formData)
                  .then((res: any) => {
                    insertFn(`${MINIO}${res.url}`, '', '');
                  })
                  .catch(() => {});
              },
              onBeforeUpload(file: any) {
                console.log('onBeforeUpload', file);
                return file; // will upload this file
              },
              onProgress(progress: any) {
                console.log('onProgress', progress);
              },
              onSuccess(file: any, res: any) {
                console.log('onSuccess', file, res);
              },
              onFailed(file: any, res: any) {
                alert(res.message);
                console.log('onFailed', file, res);
              },
              onError(file: any, err: any, res: any) {
                alert(err.message);
                console.error('onError', file, err, res);
              },
            },
          },
        },
      };

      // 组件销毁时，也及时销毁编辑器
      onBeforeUnmount(() => {
        const editor = shallowEditorRef.value;
        if (editor == null) return;
        editor.destroy();
      });

      const btnFn = {
        handleCreated: (editor: any) => {
          shallowEditorRef.value = editor; // 记录 editor 实例，重要！
        },
        setData: (content: any) => {
          state.valueHtml = content;
        },
        getData: () => {
          return {
            text: shallowEditorRef.value.getText(),
            content: shallowEditorRef.value.getHtml(),
          };
        },
      };

      watch(
        isMobile,
        () => {
          state.rerend = false;
          nextTick(() => {
            state.rerend = true;
          });
        },
        { immediate: true }
      );

      return {
        shallowEditorRef,
        ...toRefs(state),
        ...noState,
        btnFn,
        isMobile,
      };
    },
  });
</script>
<style lang="less" scoped></style>
