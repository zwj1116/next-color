<template>
  <header
    class="text-gray-600 body-font bg-white/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0"
  >
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
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
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <router-link :to="{ name: 'vArticle' }">
          <a class="mr-5 hover:text-gray-900">First Link</a>
        </router-link>
        <router-link :to="{ name: 'vColor' }">
          <a class="mr-5 hover:text-gray-900">Second Link</a>
        </router-link>
        <router-link :to="{ name: 'manage' }">
          <a class="mr-5 hover:text-gray-900">Third Link</a>
        </router-link>
        <a class="mr-5 hover:text-gray-900">Fourth Link</a>
      </nav>
      <button
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >Button
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped></style>
