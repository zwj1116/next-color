<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-12 mx-auto flex flex-col">
      <div class="lg:w-4/6 mx-auto">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" :src="info.url" />
        </div>
        <div class="py-8 border-gray-200">
          <h1 class="title-font text-5xl font-medium text-gray-900 mb-3 text-center">
            {{ info.title }}
          </h1>
          <h1 class="title-font text-base font-medium text-gray-500 mb-3 text-center">
            {{ info.updateTimeStr }}
          </h1>
          <p v-dompurify-html="info.content" class="leading-relaxed text-lg mb-4 text-left"></p>
        </div>
        <nav role="navigation" aria-label="Pagination Navigation">
          <ul class="flex items-center justify-center text-sm list-none md:gap-1 text-slate-700">
            <li>
              <a
                href="javascript:void(0)"
                aria-label="Goto Page 1"
                class="inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:text-emerald-500 hover:stroke-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:stroke-emerald-600"
                ><span class="order-2">Prev</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 -mx-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  role="graphics-symbol"
                  aria-labelledby="title-09 desc-09"
                >
                  <title id="title-09">Previous page</title>
                  <desc id="desc-09">link to previous page</desc>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="javascript:void(0)"
                aria-label="Goto Page 3"
                class="inline-flex items-center justify-center h-10 gap-4 px-4 text-sm font-medium transition duration-300 rounded focus-visible:outline-none stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:text-emerald-500 hover:stroke-emerald-500 focus:bg-emerald-50 focus:text-emerald-600 focus:stroke-emerald-600"
                ><span>Next </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 -mx-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  role="graphics-symbol"
                  aria-labelledby="title-10 desc-10"
                >
                  <title id="title-10">Next page</title>
                  <desc id="desc-10">link to next page</desc>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import ArticleApi from '@/api/article';
  import { useRoute, useRouter } from 'vue-router';
  import { MINIO } from '@/config';
  import { formatToDateTime } from '@/utils/dateUtil';

  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const state = reactive({
        info: {} as any,
      });
      const dataFn = {
        init: () => {
          ArticleApi.detail({ id: route.query?.id })
            .then((res) => {
              if (!res) {
                router.push({ name: '404' });
                return;
              }
              res.url = res.bgPic.length ? `${MINIO}${res.bgPic[0]}` : null;
              res.updateTimeStr = formatToDateTime(res.updateTime);
              state.info = res;
            })
            .catch(() => {});
        },
      };
      onMounted(() => dataFn.init());
      return {
        ...toRefs(state),
      };
    },
  });
</script>
<style lang="less"></style>
