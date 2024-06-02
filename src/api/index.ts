import { defHttp } from '@/utils/http/axios';
import { GetInfoModel } from './model/indexModel';

//基础服务
enum Api {
  //获取本用户信息
  GetMyselfUserInfo = '/base/getMyselfUserInfo',
}

export const user = {
  getInfo: () => defHttp.get<GetInfoModel>({ url: Api.GetMyselfUserInfo }),
};
