<template>
  <section class="max-h-screen py-8">
    <div class="container">
      <div class="grid grid-cols-4 items-center gap-6 lg:grid-cols-12">
        <div
          class="order-1 col-span-6 pt-6 text-center lg:-order-none lg:m-auto lg:pt-0 lg:text-left"
        >
          <h1
            class="pb-6 text-4xl font-semibold leading-tight text-wuiSlate-900 md:text-5xl lg:text-6xl"
          >
            Page not found!
          </h1>
          <p class="pb-6 text-lg">
            This page does not exist or has been removed!
            <br />
            <router-link :to="{ name: 'vColor' }">
              <a
                href="/components/"
                class="browse_components mt-6 inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded bg-wuiEmerald-500 px-6 font-medium tracking-wide text-white shadow-xl shadow-wuiEmerald-100 transition duration-300 hover:bg-wuiEmerald-600 focus:bg-wuiEmerald-600 disabled:cursor-not-allowed disabled:border-wuiEmerald-300 disabled:bg-wuiEmerald-300 disabled:shadow-none"
              >
                <span>Browse Component</span>
                <span class="relative only:-mx-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </span>
              </a>
            </router-link>
          </p>
        </div>
        <div class="col-span-6"><img src="../../assets/images/404.png" /></div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {},
  });
</script>

<style lang="less" scoped>
  .emoji-404 {
    position: relative;
    animation: mymove 2.5s infinite;
  }

  @keyframes mymove {
    33% {
      top: 0px;
    }
    66% {
      top: 20px;
    }
    100% {
      top: 0px;
    }
  }
</style>
