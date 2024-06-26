import { defineStore } from 'pinia';
import { Persistent } from '@/utils/cache/persistent';
import { TOKEN_KEY } from '@/enums/cacheEnum';

interface BasicState {
  isMobile: boolean;
  token: string;
  userInfo: any;
}

export const useBasicStore = defineStore('basic', {
  // ref()
  state: (): BasicState => ({
    isMobile: window.innerWidth < 640,
    token: '',
    userInfo: null,
  }),
  // computed()
  getters: {
    getIsMobile(): boolean {
      return this.isMobile;
    },
    getToken(): string {
      return this.token || Persistent.getLocal(TOKEN_KEY);
    },
    getUserInfo(): any {
      return this.userInfo;
    },
  },
  // function()
  actions: {
    setIsMobile(data: boolean) {
      this.isMobile = data;
    },
    setToken(info: string | undefined) {
      this.token = info ? info : '';
      Persistent.setLocal(TOKEN_KEY, this.token);
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
  },
});
