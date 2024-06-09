<template>
  <div class="flex felx-col gap-3">
    <Return name="artilce" message="文章操作"></Return>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Return from '@/components/Return/index.vue';

  export default defineComponent({
    components: { Return },
    setup() {},
  });
</script>
<style lang="less" scoped></style>
