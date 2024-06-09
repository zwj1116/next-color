<template>
  <a-layout-sider width="200" breakpoint="lg" collapsed-width="0">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKey"
      mode="inline"
      theme="dark"
      :items="menus"
      :style="{ height: '100%', borderRight: 0 }"
    >
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import menus from './data';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    setup() {
      const state = reactive({
        selectedKeys: [],
        openKey: [],
      });
      const route = useRoute();
      watch(
        () => route,
        (val: any) => {
          const { parentPath, menuPath } = val.meta;
          state.openKey = [parentPath];
          state.selectedKeys = [menuPath];
        },
        { immediate: true }
      );
      return {
        ...toRefs(state),
        menus,
      };
    },
  });
</script>
<style lang="less" scoped></style>
