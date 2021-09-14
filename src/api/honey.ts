import { defHttp } from '/@/utils/http/axios';
import { HoneyList, HoneyParams } from './model/honeyModel';

enum Api {
  HONEY_LIST = '/honeys',
  SESSION_TIMEOUT = '/user/sessionTimeout',
}

// Get personal center-basic settings

export const honeyListApi = (params?:HoneyParams) => defHttp.get<HoneyList>({ url: Api.HONEY_LIST, params });

export const sessionTimeoutApi = () => defHttp.post<void>({ url: Api.SESSION_TIMEOUT });