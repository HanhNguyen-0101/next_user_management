import { getData } from "../actions/auth.action";
import { AuthAPI } from "../api-client/auth.api";

export const getDataService = () => {
  return async (dispatch) => {
    try {
      const data = await AuthAPI.getData();
      console.log("%%%%%%%%%%%%%", data);
      dispatch(getData(data));
    } catch (error) {
      console.log(error);
    }
  };
};
