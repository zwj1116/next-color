import { defineStore } from 'pinia';
import { Persistent } from '@/utils/cache/persistent';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import DictApi from '@/api/dict';

interface BasicState {
  isMobile: boolean;
  token: string;
  userInfo: any;
  dict: any;
}

export const useBasicStore = defineStore('basic', {
  // ref()
  state: (): BasicState => ({
    isMobile: window.innerWidth < 640,
    token: '',
    userInfo: null,
    dict: null,
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
    getDict(): any {
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
    setDict() {
      return new Promise((resolve: any) => {
        if (this.dict) {
          resolve();
          return;
        }
        this.dict = { list: [], tree: [], toLabel: {} };
        DictApi.list()
          .then((res: any) => {
            this.dict.list.push(...res);
            const { parent, child } = res.reduce(
              (t: any, v: any) => {
                t[v.pid === '-1' ? 'parent' : 'child'].push(v);
                return t;
              },
              { parent: [], child: [] }
            );
            const toLabel = {} as any;
            parent.forEach((e: any) => {
              e.children = child.filter((v: any) => v.pid === e.id);
              e.children.forEach(
                (v: any) => (toLabel[`${e.id}-${v.id}`] = `${e.label}-${v.label}`)
              );
            });
            this.dict.tree = parent;
            this.dict.toLabel = toLabel;
            resolve();
          })
          .catch(() => {});
      });
    },
  },
});
