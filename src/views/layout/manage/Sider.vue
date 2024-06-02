<template>
  <a-layout-sider width="200" theme="dark" breakpoint="lg" collapsed-width="0">
    <a-menu
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      mode="inline"
      :items="menus"
      :style="{ height: '100%', borderRight: 0 }"
    >
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import menus from './data';

  export default defineComponent({
    setup() {
      const state = reactive({
        selectedKeys2: ['1'],
        openKeys: ['sub1'],
      });
      return {
        ...toRefs(state),
        menus,
      };
    },
  });
</script>
<style lang="less" scoped></style>
