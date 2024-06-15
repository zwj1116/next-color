import { defHttp } from '@/utils/http/axios';

const prefix = 'upload';

const Api = {
  image: 'image',
  del: 'delImg',
} as any;

Object.keys(Api).forEach((e) => (Api[e] = `${prefix}/${Api[e]}`));

export default {
  image: (params: any, onProgress?: any) =>
    defHttp.file(
      {
        url: Api.image,
        data: params,
      },
      onProgress
    ),
  del: (params: any) =>
    defHttp.delete({
      url: Api.del,
      params,
    }),
};
