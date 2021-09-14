import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, NewUser, RegisterResultModel,
        ListGetResultModel,Params,UserListItem } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

import { data } from '/@/views/demo/excel/data';
import { mode } from 'crypto-js';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/users',
  GetPermCode = '/getPermCode',
  Register = '/users',
  List = '/users'
}



/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  console.log("login",params)
  let data= defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
  return data;
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo.concat("/").concat("1") });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function createUser(params: NewUser ){
  let data = defHttp.post<RegisterResultModel>(
    {
      url: Api.Register,
      params,
    },
    {
        errorMessageMode: 'modal',
    }
  );
  return data;

}
export const getUserList = (params: Params) =>
  defHttp.get<ListGetResultModel>({ url: Api.List, params });
