import { AuthConstant } from "../constants";

const { GET_DATA } = AuthConstant;

const initState = {
  name: "guest",
};
const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
