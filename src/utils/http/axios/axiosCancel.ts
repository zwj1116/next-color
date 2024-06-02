import type { AxiosRequestConfig } from 'axios';
// 从 v0.22.0 开始，Axios 支持以 fetch API 方式—— AbortController 取消请求：
// CancelToken 已经被淘汰了

// 存储每个请求的标志和取消函数
const pendingRequest: Map<string, AbortController> = new Map<string, AbortController>();

const generateReqKey = (config: AxiosRequestConfig) => {
  return [config.method, config.url].join('&');
};

export class RequestCanceler {
  addPendingRequest(config: AxiosRequestConfig) {
    this.removePendingRequest(config);
    const requestKey: string = generateReqKey(config);
    if (!pendingRequest.has(requestKey)) {
      const controller = new AbortController();
      config.signal = controller.signal;
      pendingRequest.set(requestKey, controller);
    } else {
      config.signal = (pendingRequest.get(requestKey) as AbortController).signal;
    }
  }
  removePendingRequest(config: AxiosRequestConfig) {
    const requestKey = generateReqKey(config);
    if (pendingRequest.has(requestKey)) {
      (pendingRequest.get(requestKey) as AbortController).abort();
      pendingRequest.delete(requestKey);
    }
  }
  removeAllPendingRequest() {
    pendingRequest.forEach((cancel: AbortController) => {
      cancel && cancel.abort();
    });
    pendingRequest.clear();
  }
}
