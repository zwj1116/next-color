import { defineStore } from 'pinia';

interface BasicState {
  isMobile: boolean;
}

// 命名以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useBasicStore = defineStore('basic', {
  // ref()
  state: (): BasicState => ({
    isMobile: window.innerWidth < 640,
  }),
  // computed()
  getters: {
    getIsMobile(): boolean {
      return this.isMobile;
    },
  },
  // function()
  actions: {
    setIsMobile(data: boolean) {
      this.isMobile = data;
    },
  },
});
