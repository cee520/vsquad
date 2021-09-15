
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type HoneyParams = {
  current_id?: number;
  limit?: number;
  end_after?: number;
  start_before?: number;
  total?: number;
};

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


/**
 * @description: Get honey percent
 */
 export interface HoneyPetList{
  data:Array<HoneyPet>;
};

export interface HoneyPet{
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
  b: number;
  q: number;
  r: number;
  B: boolean;
}


export type HoneyResultList = BasicFetchResult<HoneyList>;
export type HoneyPetResultList = BasicFetchResult<HoneyPetList>;