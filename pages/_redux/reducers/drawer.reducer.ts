import { DrawerConstant } from "../constants";

const { OPEN_DRAWER, HIDE_DRAWER } = DrawerConstant;

const initState = {
  visible: false,
  title: "",
  FormComponent: null,
  submitAction: () => {},
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
    default:
      return { ...state };
  }
};

export default drawerReducer;
