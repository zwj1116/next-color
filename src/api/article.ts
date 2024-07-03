import { defHttp } from '@/utils/http/axios';

const prefix = 'article';

const Api = {
  add: 'add',
  del: 'del',
  update: 'update',
  pfDetail: 'pfDetail',
  pfPage: 'pfPage',
  page: 'page',
  detail: 'detail',
} as any;

Object.keys(Api).forEach((e) => (Api[e] = `${prefix}/${Api[e]}`));

export default {
  add: (params: any) => defHttp.post({ url: Api.add, data: params }),
  del: (params: any) => defHttp.delete({ url: `${Api.del}`, params }),
  update: (params: any) => defHttp.post({ url: Api.update, data: params }),
  pfDetail: (params: any) => defHttp.get({ url: Api.pfDetail, params }),
  detail: (params: any) => defHttp.get({ url: Api.detail, params }),
  pfPage: (params: any, pageNum = 1, pageSize = 10) =>
    defHttp.get({ url: `${Api.pfPage}/${pageNum}/${pageSize}`, data: params }),
  page: (params: any, pageNum = 1, pageSize = 10) =>
    defHttp.get({ url: `${Api.page}/${pageNum}/${pageSize}`, data: params }),
};
