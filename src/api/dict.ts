import { defHttp } from '@/utils/http/axios';

const prefix = 'dict';

const Api = {
  page: 'page',
  add: 'add',
  del: 'del',
  update: 'update',
  tree: 'tree',
  list: 'list',
} as any;

Object.keys(Api).forEach((e) => (Api[e] = `${prefix}/${Api[e]}`));

export default {
  page: (params: any, pageNum = 1, pageSize = 10) => {
    return defHttp.get({ url: `${Api.page}/${pageNum}/${pageSize}`, params });
  },
  add: (params: any) => defHttp.post({ url: Api.add, data: params }),
  del: (params: any) => defHttp.delete({ url: `${Api.del}`, params }),
  update: (params: any) => defHttp.post({ url: Api.update, params }),
  tree: () => defHttp.get({ url: Api.tree }),
  list: () => defHttp.get({ url: Api.list }),
};
