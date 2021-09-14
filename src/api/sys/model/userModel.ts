
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  id: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  id: string | number;
  // 用户名
  username: string;
  // 真实名字
  full_name: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface NewUser{
  username: string;
  mobile: string;
  password: string;
  sms: string;
}

export interface RegisterResultModel{
  id: string |number;
  message: string;
}

export type Params = BasicPageParams & {
  username?: string;
  mobile?: string;
};
export interface ListItem {
  id: string;
  username: string;
  mobile: string;
  email: string;
  full_name: string;
  role: number;
  create_at: string;
  locked_at: string;
  last_sign_at: string;
}
export type ListGetResultModel = BasicFetchResult<ListItem>;