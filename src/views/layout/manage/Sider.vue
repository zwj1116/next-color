<template>
  <div>
    <button
      title="Side navigation"
      type="button"
      :class="[
        'fixed z-40 self-center order-10 visible block w-10 h-10 bg-white rounded opacity-100 sm:hidden right-4',
        isSideNavOpen
          ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45'
          : '',
      ]"
      style="top: 70px"
      aria-haspopup="menu"
      aria-label="Side navigation"
      :aria-expanded="isSideNavOpen"
      aria-controls="nav-menu-1"
      @click="btnFn.setOpen"
    >
      <div class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <span
          aria-hidden="true"
          class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
        ></span>
        <span
          aria-hidden="true"
          class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
        ></span>
        <span
          aria-hidden="true"
          class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
        ></span>
      </div>
    </button>
    <aside
      id="nav-menu-1"
      aria-label="Side navigation"
      :class="[
        'h-full flex flex-col transition-transform -translate-x-full bg-white border-r sm:translate-x-0 border-r-slate-200 z-40 rounded-lg',
        isMobile
          ? isSideNavOpen
            ? 'translate-x-0 w-44 absolute'
            : '-translate-x-full w-0'
          : 'w-44',
      ]"
    >
      <nav aria-label="side navigation" class="flex-1 overflow-auto divide-y divide-slate-100">
        <div>
          <ul class="flex flex-col flex-1 gap-1 py-3">
            <li v-for="item in menus" :key="item.key" class="px-3" @click="btnFn.select(item)">
              <a
                href="javascript:void(0)"
                class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-emerald-500 hover:bg-emerald-50 focus:bg-emerald-50 aria-[current=page]:text-emerald-500 aria-[current=page]:bg-emerald-50"
                :aria-current="selectedKeys.includes(item.key) ? 'page' : ''"
              >
                <div class="flex items-center self-center">
                  <svg-icon :icon-class="item.icon" />
                </div>
                <div
                  class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate"
                >
                  {{ item.label }}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    <div
      :class="[
        'fixed top-0 bottom-0 left-0 right-0 z-30 transition-colors sm:hidden',
        isSideNavOpen ? 'block' : 'hidden',
      ]"
      @click="btnFn.setOpen"
    ></div>
  </div>
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
        isSideNavOpen: false,
      });
      const route = useRoute();
      const router = useRouter();

      const isMobile = computed(() => useBasicStore().isMobile);

      const btnFn = {
        select: (e: any) => {
          router.push({ name: e.key });
          state.isSideNavOpen = false;
        },
        setOpen: () => {
          state.isSideNavOpen = !state.isSideNavOpen;
        },
      };

      watch(
        () => route,
        (val: any) => {
          const { menuPath } = val.meta;
          state.selectedKeys = [menuPath];
        },
        { immediate: true, deep: true }
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
