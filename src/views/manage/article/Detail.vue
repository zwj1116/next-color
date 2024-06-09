<template>
  <div class="flex flex-col gap-3 h-full">
    <Return name="article" message="文章查看"></Return>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Return from '@/components/Return/index.vue';
  // import ArticleApi from '@/api/article';

  export default defineComponent({
    components: { Return },
    setup() {},
  });
</script>
<style lang="less" scoped></style>
