<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="customfileList"
      accept=".jpg,.png"
      list-type="picture-card"
      :customRequest="() => {}"
      :beforeUpload="fileFn.beforeUpload"
      class="pic-upload"
      @preview="fileFn.preview"
      @change="fileFn.change"
      @remove="fileFn.remove"
    >
      <div class="flex flex-col items-center">
        <plus-outlined />
        <div style="margin-top: 8px">Upload</div>
      </div>
    </a-upload>
    <a-modal :open="previewVisible" title="图片查看" :footer="null" @cancel="fileFn.cancel">
      <img alt="example" class="modal-img object-contain w-full" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useVModel } from '@vueuse/core';
  import UploadApi from '@/api/upload';
  import { MINIO } from '@/config';
  import { reactive, toRefs } from 'vue';

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  export default defineComponent({
    components: { PlusOutlined },
    props: {
      fileList: {
        type: Array,
        default: () => [],
      },
    },
    // emit: ['update:fileList'],
    setup(props: any, { emit }) {
      const fileListCopy = useVModel(props, 'fileList', emit);
      const state = reactive({
        previewVisible: false,
        previewImage: '',
        customfileList: [] as any,
      });

      const fileFn = {
        cancel: () => {
          state.previewVisible = false;
        },
        preview: async (file: any) => {
          if (!file.url && !file.preview) {
            file.preview = (await getBase64(file.originFileObj)) as string;
          }
          state.previewImage = `${MINIO}${file.url}` || file.preview;
          state.previewVisible = true;
        },
        beforeUpload: (file: File) => {
          fileFn.customRequest(file);
        },
        customRequest: (file: any) => {
          const formData = new FormData();
          formData.append('file', file);

          UploadApi.image(formData, (percent: number) => {
            const _file = state.customfileList.find((e: any) => e.uid === file.uid);
            _file.status = 'uploading';
            _file.percent = percent;
          })
            .then((res: any) => {
              const _file = state.customfileList.find((e: any) => e.uid === file.uid);
              _file.status = 'done';
              _file.percent = 100;
              _file.url = res.url;
              fileListCopy.value = state.customfileList.map((e: any) => e.url);
            })
            .catch(() => {
              const index = state.customfileList.findIndex((e: any) => e.uid === file.uid);
              state.customfileList.splice(index, 1);
              fileListCopy.value = state.customfileList.map((e: any) => e.url);
            });
        },
        remove: (file: any) => {
          if (!file.url) return;

          UploadApi.del({ url: file.url.split('/image/')[1] })
            .then(() => {
              fileListCopy.value = state.customfileList.map((e: any) => e.url);
            })
            .catch(() => {});
        },
      };
      return {
        ...toRefs(state),
        fileFn,
      };
    },
  });
</script>
<style lang="less" scoped>
  .modal-img {
    height: 65vh;
  }
</style>
