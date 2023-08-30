import { GET_DATA } from "../types/auth.type";

const initState = {
    name: "guest",
}
const authReducer = (state = initState, action: any) => {
  switch(action.type){
    case GET_DATA:
      return { 
        ...state,
        name: action.payload
      };
    default:
      return {...state};
    }
}

export default authReducer;