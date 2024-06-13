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
      @select="btnFn.select"
    >
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
  import menus from './data';
  import { useRoute, useRouter } from 'vue-router';
  import { useBasicStore } from '@/store/modules/basic';

  export default defineComponent({
    setup() {
      const state = reactive({
        selectedKeys: [] as any,
        openKey: [] as any,
      });
      const route = useRoute();
      const isMobile = computed(() => useBasicStore().isMobile);
      const router = useRouter();

      const btnFn = {
        select: (e: any) => {
          router.push({ name: e.key });
        },
      };

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
        btnFn,
      };
    },
  });
</script>
<style lang="less" scoped></style>
