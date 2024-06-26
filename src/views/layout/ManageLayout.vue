<template>
  <a-layout class="h-full overflow-hidden">
    <a-layout-header class="header">
      <div class="flex items-center h-full">
        <router-link :to="{ name: 'vColor' }">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Tailblocks</span>
          </a>
        </router-link>
      </div>
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
            <keep-alive :include="KeepAliveList">
              <router-view></router-view>
            </keep-alive>
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
      const state = reactive({
        KeepAliveList: [] as any,
      });
      const isMobile = computed(() => useBasicStore().isMobile);

      watch(
        route,
        (val: any) => {
          if (val.meta.keepAlive && !state.KeepAliveList.includes(val.name)) {
            state.KeepAliveList.push(val.name);
          }
        },
        { immediate: true }
      );

      return {
        route,
        isMobile,
        ...toRefs(state),
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    background: white;
  }
</style>
