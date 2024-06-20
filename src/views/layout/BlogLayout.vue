<template>
  <a-layout class="h-full overflow-auto">
    <BlogHeader />
    <a-layout>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import BlogHeader from './blog/Header.vue';

  export default defineComponent({
    components: { BlogHeader },
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped></style>
