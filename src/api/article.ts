import { defHttp } from '@/utils/http/axios';

const prefix = 'article';

const Api = {
  add: 'add',
  del: 'del',
  update: 'update',
  deatil: 'deatil',
  page: 'page',
} as any;

Object.keys(Api).forEach((e) => (Api[e] = `${prefix}/${Api[e]}`));

export default {
  add: (params: any) => defHttp.post({ url: Api.add, data: params }),
  del: (id: string) => defHttp.delete({ url: `${Api.del}/${id}` }),
  update: (params: any) => defHttp.post({ url: Api.update, data: params }),
  deatil: (id: string) => defHttp.get({ url: `${Api.deatil}/${id}` }),
  page: (params: any, pageNum = 1, pageSize = 10) =>
    defHttp.get({ url: `${Api.page}/${pageNum}/${pageSize}`, data: params }),
};
