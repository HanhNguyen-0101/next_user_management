import { DrawerConstant } from "../constants";

const { OPEN_DRAWER, HIDE_DRAWER, SET_CALLBACK_DRAWER, SET_RESET_CALLBACK_DRAWER } = DrawerConstant;

const initState = {
  visible: false,
  title: "",
  FormComponent: null,
  submitAction: () => {},
  resetAction: () => {},
};
const drawerReducer = (state = initState, action: any) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case HIDE_DRAWER: {
      return {
        ...state,
        ...initState,
      };
    }
    case SET_CALLBACK_DRAWER: {
      return { ...state, submitAction: action.payload };
    }
    case SET_RESET_CALLBACK_DRAWER: {
      return { ...state, resetAction: action.payload };
    }
    default:
      return { ...state };
  }
};

export default drawerReducer;
