<template>
  <div class="flex flex-col gap-3 h-full overflow-auto">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <span>名称: </span>
        <span>{{ info.name }}</span>
      </div>
      <div class="flex gap-2">
        <span>色号: </span>
        <span>{{ info.rgb }}</span>
      </div>
      <div class="flex gap-2">
        <span>介绍: </span>
        <span>{{ info.abstract }}</span>
      </div>
      <div class="flex gap-2">
        <span>图片: </span>
        <div v-for="(item, index) in info.livePic" :key="index" class="flex gap-2 w-20 h-20">
          <a-image :src="`${MINIO}${item}`" />
        </div>
      </div>
    </div>
    <a-card v-for="(item, index) in info.items" :key="index">
      <div class="flex gap-2">
        <span>名称: </span>
        <span>{{ item.name }}</span>
      </div>
      <div class="flex gap-2">
        <span>第一次出现: </span>
        <span>{{ item.isFirst }}</span>
      </div>
      <div class="flex gap-2">
        <span>作者: </span>
        <span>{{ item.author }}</span>
      </div>
      <div class="flex gap-2">
        <span>时间: </span>
        <span>{{ item.time }}</span>
      </div>
      <div class="flex gap-2">
        <span>内容: </span>
        <span>{{ item.origin }}</span>
      </div>
      <div class="flex gap-2">
        <span>链接: </span>
        <span>{{ item.link }}</span>
      </div>
      <div class="flex gap-2">
        <span>图片: </span>
        <div v-for="(pic, _index) in item.originPic" :key="_index" class="flex gap-2 w-20 h-20">
          <a-image :src="`${MINIO}${pic}`" />
        </div>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import { useRoute } from 'vue-router';
  import ColorApi from '@/api/color';
  import { MINIO } from '@/config';

  export default defineComponent({
    setup() {
      const route = useRoute();
      const state = reactive({
        info: {} as any,
      });
      const dataFn = {
        init: () => {
          ColorApi.pfDetail({ id: route.query?.id })
            .then((res) => {
              state.info = res;
            })
            .catch(() => {});
        },
      };
      onMounted(() => dataFn.init());
      return {
        ...toRefs(state),
        MINIO,
      };
    },
  });
</script>
<style lang="less" scoped></style>
