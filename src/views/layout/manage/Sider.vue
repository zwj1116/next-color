<template>
  <a-layout-sider
    width="180"
    breakpoint="sm"
    collapsed-width="0"
    class="h-full"
    :style="{ position: isMobile ? 'fixed !important' : '' }"
  >
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKey"
      mode="inline"
      theme="dark"
      :items="menus"
      class="h-full border-r-0"
    >
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import menus from './data';
  import { useRoute } from 'vue-router';
  import { useBasicStore } from '@/store/modules/basic';

  export default defineComponent({
    setup() {
      const state = reactive({
        selectedKeys: [],
        openKey: [],
      });
      const route = useRoute();
      const isMobile = computed(() => useBasicStore().isMobile);
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
        isMobile,
      };
    },
  });
</script>
<style lang="less" scoped></style>
