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
          <svg-icon icon-class="square" class="cursor-pointer hover:shadow-lg" />
        </div>
        <div
          :class="[
            'p-2 hover:bg-white rounded duration-300 transition-all',
            displayStatus === 2 ? 'bg-white shadow-lg' : '',
          ]"
          @click="btn.changeDisplayStatus(2)"
        >
          <svg-icon icon-class="list-ul" class="cursor-pointer hover:shadow-lg" />
        </div>
      </div>
      <div v-if="displayStatus === 1" class="flex flex-wrap">
        <div v-for="(item, index) in 10" :key="index" class="p-4 lg:w-1/3 sm:w-full">
          <div
            class="h-full bg-white bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
              >CATEGORY</h2
            >
            <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3"
              >Raclette Blueberry Nextious Level</h1
            >
            <p class="leading-relaxed mb-3"
              >Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled
              waistcoat.</p
            >
            <a class="text-indigo-500 inline-flex items-center"
              >Learn More
              <svg
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div
              class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4"
            >
              <span
                class="text-gray-400 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle></svg
                >1.2K
              </span>
              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg
                  class="w-4 h-4 mr-1"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  ></path></svg
                >6
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="(item, index) in 10"
          :key="index"
          class="bg-white hover:shadow-lg rounded-lg transition-all duration-300 gap-4 cursor-pointer"
        >
          <div class="p-8 flex flex-wrap md:flex-nowrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="font-semibold title-font text-gray-700">CATEGORY</span>
              <span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2"
                >Meditation bushwick direct trade taxidermy shaman</h2
              >
              <p class="leading-relaxed"
                >Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up
                snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke
                vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p
              >
              <a class="text-indigo-500 inline-flex items-center mt-4"
                >Learn More
                <svg
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import ArticleApi from '@/api/article';

  export default defineComponent({
    setup() {
      const state = reactive({
        displayStatus: 2 as number,
        list: [] as any,
      });

      const btn = {
        changeDisplayStatus(status: number) {
          state.displayStatus = status;
        },
      };
      const dataFn = {
        init: () => {
          state.list.length = 0;
          ArticleApi.page({}, 1, 10)
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
