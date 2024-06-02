<template>
  <a-layout class="h-full overflow-hidden">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout class="overflow-hidden" style="height: calc(100% - 64px)">
      <Sider />
      <a-layout style="padding: 16px">
        <a-layout-content class="overflow-auto bg-white">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Sider from './manage/Sider.vue';

  export default defineComponent({
    components: { Sider },
    setup() {},
  });
</script>
<style lang="less" scoped></style>
