import { MdmVslCntrConstant } from "../constants";
import { MdmVslCntrState } from "../models/mdmVslCntr";

const {
  GET_MDM_VSL_CNTR_LIST_FAILUER,
  GET_MDM_VSL_CNTR_LIST_SUCCESS,
  GET_MDM_VSL_CNTR_ITEM_SUCCESS,
  GET_MDM_VSL_CNTR_ITEM_FAILUER,
  ADD_MDM_VSL_CNTR_ITEM_SUCCESS,
  ADD_MDM_VSL_CNTR_ITEM_FAILUER,
  EDIT_MDM_VSL_CNTR_ITEM_SUCCESS,
  EDIT_MDM_VSL_CNTR_ITEM_FAILURE,
  REMOVE_MDM_VSL_CNTR_ITEM_SUCCESS,
  REMOVE_MDM_VSL_CNTR_ITEM_FAILURE,

  SET_CALLBACK_NEXT_STEP_ACTION,
  SET_NEXT_STEP_DATA,
  SET_PREVIOUS_STEP_DATA,
} = MdmVslCntrConstant;

const initState: MdmVslCntrState = {
  mdmVslCntrData: {
    currentPage: 0,
    data: [],
    nextPage: 0,
    prevPage: 0,
    total: 0,
  },
  mdmVslCntr: null,
  error: null,
  query: {},
  nextStepAction: () => {},
  mdmVslCntrSteps: {},
  currentStep: 0,
};

const MdmVslCntrReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case GET_MDM_VSL_CNTR_LIST_SUCCESS: {
      return { ...state, mdmVslCntrData: payload?.data, query: payload?.query };
    }
    case GET_MDM_VSL_CNTR_LIST_FAILUER: {
      return { ...state, error: payload?.data };
    }
    case ADD_MDM_VSL_CNTR_ITEM_SUCCESS: {
      return { ...state, mdmVslCntr: payload };
    }
    case ADD_MDM_VSL_CNTR_ITEM_FAILUER: {
      return { ...state, error: payload?.data };
    }
    case GET_MDM_VSL_CNTR_ITEM_SUCCESS: {
      return { ...state, mdmVslCntr: payload };
    }
    case GET_MDM_VSL_CNTR_ITEM_FAILUER: {
      return { ...state, error: payload?.data };
    }
    case REMOVE_MDM_VSL_CNTR_ITEM_SUCCESS: {
      return { ...state };
    }
    case REMOVE_MDM_VSL_CNTR_ITEM_FAILURE: {
      return { ...state, error: payload?.data };
    }
    case EDIT_MDM_VSL_CNTR_ITEM_SUCCESS: {
      return { ...state, mdmVslCntr: payload };
    }
    case EDIT_MDM_VSL_CNTR_ITEM_FAILURE: {
      return { ...state, error: payload?.data };
    }
    case SET_CALLBACK_NEXT_STEP_ACTION: {
      return { ...state, nextStepAction: payload };
    }
    case SET_NEXT_STEP_DATA: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
        mdmVslCntrSteps: { ...state.mdmVslCntrSteps, ...payload },
      };
    }
    case SET_PREVIOUS_STEP_DATA: {
      const previousStep = state.currentStep > 0 ? state.currentStep - 1 : 0;
      return { ...state, currentStep: previousStep };
    }
    default:
      return { ...state };
  }
};

export default MdmVslCntrReducer;
