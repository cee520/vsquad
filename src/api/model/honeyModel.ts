
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';


/**
 * @description: Get honey value
 */
export interface HoneyList{
  data:Array<Honey>;
};

export interface Honey{
  id: number;
  t: number;
  T: number;
  s: String;
  i: number;
  o: number;
  c: number;
  h: number;
  l: number;
  a: number;
  v: number;
  q: number;
  r: number;
  B: boolean;
}
export type HoneyParams = {
  current_id?: number;
  end_after?: number;
  start_before?: number;
  total: number;
};

// export interface RegisterResultModel{
//   id: string |number;
//   message: string;
// }

// export type Params = BasicPageParams & {
//   username?: string;
//   mobile?: string;
// };
// export interface ListItem {
//   id: string;
//   username: string;
//   mobile: string;
//   email: string;
//   full_name: string;
//   role: number;
//   create_at: string;
//   locked_at: string;
//   last_sign_at: string;
// }
export type ListGetResultModel = BasicFetchResult<ListItem>;