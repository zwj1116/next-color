<template>
  <div class="flex flex-col gap-3 h-full overflow-hidden">
    <div class="flex flex-col gap-2 px-20 py-2 overflow-auto bg-white rounded-lg">
      <div class="text-3xl font-bold text-center">{{ info.title }}</div>
      <div class="text-md text-center">{{ info.updateTimeStr }}</div>
      <div v-dompurify-html="info.content" class="text-lg" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ArticleApi from '@/api/article';
  import { formatToDateTime } from '@/utils/dateUtil';

  export default defineComponent({
    setup() {
      const route = useRoute();
      const state = reactive({
        info: {} as any,
      });
      const dataFn = {
        init: () => {
          ArticleApi.pfDetail({ id: route.query?.id })
            .then((res) => {
              res.updateTimeStr = formatToDateTime(res.updateTime || res.createTime);
              state.info = res;
            })
            .catch(() => {});
        },
      };
      onMounted(() => dataFn.init());
      return {
        ...toRefs(state),
        // MINIO,
      };
    },
  });
</script>
<style lang="less" scoped></style>
