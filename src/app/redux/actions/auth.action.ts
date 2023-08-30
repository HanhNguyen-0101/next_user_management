import { GET_DATA } from "../types/auth.type";

export const getData = (payload: any): any => ({
  type: GET_DATA,
  payload,
});
