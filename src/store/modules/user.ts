import { defineStore } from 'pinia';
import { Persistent } from '@/utils/cache/persistent';
import { TOKEN_KEY } from '@/enums/cacheEnum';

interface UserState {
  token: string;
}

// 命名以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserStore = defineStore('user', {
  // ref()
  state: (): UserState => ({
    token: '',
  }),
  // computed()
  getters: {
    getToken(): string {
      return this.token || Persistent.getLocal(TOKEN_KEY);
    },
  },
  // function()
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '';
      Persistent.setLocal(TOKEN_KEY, this.token);
    },
  },
});
