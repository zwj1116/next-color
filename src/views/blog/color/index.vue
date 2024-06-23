<template>
  <section class="text-gray-600 body-font">
    <div class="container px-0 py-12 mx-auto">
      <div class="flex flex-col text-center w-full mb-8">
        <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1"
          >ROOF PARTY POLAROID</h2
        >
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
          >Master Cleanse Reliac Heirloom</h1
        >
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base"
          >Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile
          poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing
          selfies heirloom prism food truck ugh squid celiac humblebrag.</p
        >
      </div>
      <div class="flex gap-8 justify-end my-4 title-font sm:text-2xl text-xl">
        <div
          :class="[
            'p-2 hover:bg-white rounded duration-300 transition-all',
            displayStatus === 1 ? 'bg-white shadow-lg' : '',
          ]"
          @click="btn.changeDisplayStatus(1)"
        >
          <svg-icon icon-class="s" class="cursor-pointer hover:shadow-lg" />
        </div>
        <div
          :class="[
            'p-2 hover:bg-white rounded duration-300 transition-all',
            displayStatus === 2 ? 'bg-white shadow-lg' : '',
          ]"
          @click="btn.changeDisplayStatus(2)"
        >
          <svg-icon icon-class="gallery" class="cursor-pointer hover:shadow-lg" />
        </div>
      </div>
      <div v-if="displayStatus === 1" class="flex flex-wrap">
        <div v-for="item in list" :key="item.id" class="p-4 lg:w-1/5 sm:w-fullmax-sm:w-full">
          <div
            class="h-full flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 cursor-pointer rounded-lg"
          >
            <div
              class="flex-shrink-0 rounded-lg w-full h-36 object-cover object-center mb-2"
              :style="{ background: item.rgb }"
            />
            <div class="w-full">
              <h2 class="title-font font-medium text-lg text-gray-900">{{ item.name }}</h2>
              <h3 class="text-gray-500 mb-3">{{ item.rgb }} </h3>
              <p class="mb-2 line-clamp-3" :title="item.abstract">{{ item.abstract }}</p>
              <!-- <span class="inline-flex">
                <a class="text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                    ></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                    ></path>
                  </svg>
                </a>
              </span> -->
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="displayStatus === 2" class="flex flex-wrap">
        <div v-for="item in list" :key="item.id" class="lg:w-1/5 md:w-1/4 sm:w-1/2 p-4">
          <div class="flex relative hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div
              class="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
              :style="{ background: item.rgb }"
            />
            <div
              class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 rounded-lg transition-all duration-300"
            >
              <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{{
                item.name
              }}</h2>
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{{ item.rgb }}</h1>
              <p class="leading-relaxed line-clamp-3 h-16" :title="item.abstract">
                {{ item.abstract }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import ColorApi from '@/api/color';

  export default defineComponent({
    setup() {
      const state = reactive({
        displayStatus: 1 as number,
        list: [] as any,
      });
      const btn = {
        changeDisplayStatus(status: number) {
          state.displayStatus = status;
        },
      };
      const dataFn = {
        init: () => {
          state.list.lenth = 0;
          ColorApi.list()
            .then((res: any) => {
              state.list.push(...res);
            })
            .catch(() => {});
        },
      };
      onMounted(() => dataFn.init());
      return {
        ...toRefs(state),
        btn,
      };
    },
  });
</script>
<style lang="less" scoped></style>
