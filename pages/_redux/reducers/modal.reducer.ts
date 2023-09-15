import { ModalConstant } from "../constants";

const {
  OPEN_MODAL,
  HIDE_MODAL,
  SET_CALLBACK_MODAL,
  SET_RESET_CALLBACK_MODAL,
  SET_DELETE_CALLBACK_MODAL,
} = ModalConstant;

const initState = {
  visible: false,
  title: "",
  hiddenSubmitBtn: false,
  FormComponent: null,
  submitAction: () => {},
  resetAction: () => {},
  deleteAction: () => {},
};
const modalReducer = (state = initState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        ...initState,
      };
    }
    case SET_CALLBACK_MODAL: {
      return { ...state, submitAction: action.payload };
    }
    case SET_RESET_CALLBACK_MODAL: {
      return { ...state, resetAction: action.payload };
    }
    case SET_DELETE_CALLBACK_MODAL: {
      return { ...state, deleteAction: action.payload };
    }
    default:
      return { ...state };
  }
};

export default modalReducer;
