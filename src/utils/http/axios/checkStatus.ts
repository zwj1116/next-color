import { showNft, reLogin } from './createAxios';
export function checkStatus(responseCode: number, msg?: string): void {
  let errMsg = msg ?? '';
  switch (responseCode) {
    case 401:
      errMsg = '认证失败，请重新登录';
      reLogin();
      break;
    case 403:
      errMsg = '登录信息过期，请重新登录';
      reLogin();
      break;
    case 404:
      errMsg = '网络请求错误，未找到该资源';
      break;
    case 429:
      errMsg = '请求过于频繁，请稍后再试';
      break;
    case 500:
      errMsg = '服务器错误，请联系管理员';
      break;
    case 501:
      errMsg = '网络未实现';
      break;
    case 502:
      errMsg = '服务器网关错误';
      break;
    case 503:
      errMsg = '服务器暂时过载或维护';
      break;
    case 504:
      errMsg = '网络超时';
      break;
    case 505:
      errMsg = 'http版本不支持该请求';
      break;
  }
  showNft(errMsg);
}
