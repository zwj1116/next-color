import { defHttp } from '@/utils/http/axios';

const prefix = 'color';

const Api = {
  list: 'list',
  page: 'page',
  add: 'add',
  del: 'del',
  update: 'update',
  pfDetail: 'pfDetail',
} as any;

Object.keys(Api).forEach((e) => (Api[e] = `${prefix}/${Api[e]}`));

export default {
  list: () => defHttp.get({ url: Api.list }),
  page: (params: any, pageNum = 1, pageSize = 10) =>
    defHttp.get({ url: `${Api.page}/${pageNum}/${pageSize}`, data: params }),
  add: (params: any) => defHttp.post({ url: Api.add, data: params }),
  del: (params: any) => defHttp.delete({ url: `${Api.del}`, params }),
  update: (params: any) => defHttp.post({ url: Api.update, data: params }),
  pfDetail: (params: any) => defHttp.get({ url: Api.pfDetail, params }),
};
