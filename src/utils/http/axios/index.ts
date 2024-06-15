import { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import qs from 'qs';
import axios from '@/utils/http/axios/createAxios';
import { HttpResponse } from '@/types/axios';

function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    axios(config)
      .then((res: AxiosResponse<HttpResponse<T>>) => {
        resolve(res.data as unknown as T);
      })
      .catch((e: Error | AxiosError) => {
        reject(e);
      });
  });
}

export const defHttp = {
  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return request({
      ...config,
      method: RequestEnum.GET,
    });
  },
  post<T>(config: AxiosRequestConfig): Promise<T> {
    const data = qs.stringify(config.data);
    delete config['data'];
    return request({
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': ContentTypeEnum.FORM_URLENCODED,
      },
      ...config,
      method: RequestEnum.POST,
      data: data,
    });
  },
  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return request({
      ...config,
      method: RequestEnum.DELETE,
    });
  },
  put<T>(config: AxiosRequestConfig): Promise<T> {
    return request({
      ...config,
      method: RequestEnum.PUT,
    });
  },
  file<T>(config: AxiosRequestConfig, onProgress?: any): Promise<T> {
    const data = config.data;
    delete config['data'];
    return request({
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': ContentTypeEnum.FILE,
      },
      ...config,
      method: RequestEnum.POST,
      data: data,
      // 在请求配置中设置onUploadProgress回调
      onUploadProgress: (progressEvent: any) => {
        if (onProgress) {
          if (progressEvent.lengthComputable) {
            onProgress({ percent: (progressEvent.loaded / progressEvent.total) * 100 });
          }
        }
      },
    });
  },
};
