<template>
  <a-layout class="h-full overflow-hidden">
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout class="overflow-hidden" style="height: calc(100% - 64px)">
      <Sider />
      <a-layout style="padding: 16px">
        <a-layout-content class="overflow-auto">
          <div class="flex flex-col gap-3 h-full">
            <Return
              :isTitle="!route.meta.needBack"
              :message="route.meta.title"
              :name="route.meta.menuPath"
              :class="[isMobile ? 'ml-8' : '']"
            />
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Sider from './manage/Sider.vue';
  import Return from '@/components/Return/index.vue';
  import { useRoute } from 'vue-router';
  import { useBasicStore } from '@/store/modules/basic';

  export default defineComponent({
    components: { Sider, Return },
    setup() {
      const route = useRoute();
      const isMobile = computed(() => useBasicStore().isMobile);
      return {
        route,
        isMobile,
      };
    },
  });
</script>
<style lang="less" scoped></style>
