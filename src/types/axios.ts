// 接口响应通过格式
export interface HttpResponse<T> {
  success: boolean;
  msg: string | null;
  code: number;
  timeStamp: number;
  data: T;
}
