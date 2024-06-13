import { defHttp } from '@/utils/http/axios';

const prefix = 'system';

const Api = {
  captcha: 'captcha',
  register: 'register',
  login: 'login',
  userInfo: 'userInfo',
  update: 'update',
  del: 'update',
} as any;

Object.keys(Api).forEach((e) => (Api[e] = `${prefix}/${Api[e]}`));

export const SystemApi = {
  captcha: () => defHttp.get({ url: Api.captcha }),
  register: (params: any) => defHttp.post({ url: Api.register, data: params }),
  login: (params: any) => defHttp.post({ url: Api.login, data: params }),
  userInfo: () => defHttp.get({ url: Api.userInfo }),
  update: (params: any) => defHttp.post({ url: Api.update, data: params }),
  del: (params: any) => defHttp.delete({ url: Api.del, params }),
};
