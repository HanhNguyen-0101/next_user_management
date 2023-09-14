import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import drawerReducer from "./drawer.reducer";
import menuReducer from "./menu.reducer";
import userReducer from "./user.reducer";
import modalReducer from "./modal.reducer";

const rootReducer = combineReducers({
  authReducer,
  drawerReducer,
  menuReducer,
  userReducer,
  modalReducer,
});

export default rootReducer;
