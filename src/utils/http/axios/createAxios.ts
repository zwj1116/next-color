import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
import { notification } from 'ant-design-vue';
import { ContentTypeEnum, TIME_OUT } from '@/enums/httpEnum';
import { checkStatus } from '@/utils/http/axios/checkStatus';
import { PageEnum } from '@/enums/pageEnum';
import { useUserStore } from '@/store/modules/user';
import { RequestCanceler } from './axiosCancel';

const axiosCanceler = new RequestCanceler();
const service: AxiosInstance = axios.create({
  timeout: 10 * 1000, // 请求超时时间
  baseURL: '/yk',
  withCredentials: true,
  headers: {
    'Content-type': ContentTypeEnum.JSON,
  },
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = useUserStore().getToken;
    if (token && config.headers) {
      config.headers[TOKEN_KEY] = token;
    }
    axiosCanceler.addPendingRequest(config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const err = (error: AxiosError<any>) => {
  //断网超时处理
  if (!error.response) {
    if (error.message.includes(TIME_OUT)) {
      showNft('请求超时');
      return Promise.reject({ code: 5, success: false, msg: '请求超时' });
    }
    if (error.message.includes('canceled')) {
      showNft('请求取消');
      return Promise.reject({ code: error.code, success: false, msg: '请求取消' });
    }
  } else {
    checkStatus(error.response.status, error.response.data.message);
  }
  return Promise.reject(error);
};

const needReLoginCodes: Array<number> = [2, 3, 4]; //需要重新登录的code
service.interceptors.response.use((response: AxiosResponse) => {
  axiosCanceler.removePendingRequest(response.config);
  const responseCode: number = response.status;
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    if (response.data === '') {
      showNft('服务异常');
      return Promise.reject(response);
    } else if (response.data.code !== 200) {
      const msg: string = response.data.msg;
      showNft(msg);
      if (needReLoginCodes.indexOf(response.data.code) > -1) {
        reLogin();
      } else {
        return Promise.reject(response);
      }
    }
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response);
  }
}, err);

export function showNft(errorMsg: string): void {
  notification.destroy();
  notification.error({
    message: errorMsg,
  });
}

export function reLogin(): void {
  setTimeout(() => {
    Persistent.removeLocal(TOKEN_KEY);
    window.location.replace(PageEnum.LOGIN);
  }, 1500);
}

export default service;
