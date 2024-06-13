<template>
  <a-layout-sider width="200" breakpoint="lg" collapsed-width="0">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKey"
      mode="inline"
      theme="dark"
      :items="menus"
      :style="{ height: '100%', borderRight: 0 }"
      @select="btnFn.select"
    >
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, watch } from 'vue';
  import menus from './data';
  import { useRoute, useRouter } from 'vue-router';

  export default defineComponent({
    setup() {
      const state = reactive({
        selectedKeys: [] as any,
        openKey: [] as any,
      });
      const route = useRoute();
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
        btnFn,
      };
    },
  });
</script>
<style lang="less" scoped></style>
