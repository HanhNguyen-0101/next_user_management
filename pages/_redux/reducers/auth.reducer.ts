import { AuthConstant } from "../constants";

const { GET_DATA, LOGIN_SUCCESS } = AuthConstant;

const initState = {
  name: "guest",
  token: null,
};
const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        name: action.payload,
      };
    case LOGIN_SUCCESS: {
      console.log("********", action.payload);
      return {
        ...state,
        token: action.payload.access_token,
      };
    }
    default:
      return { ...state };
  }
};

export default authReducer;
