import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import drawerReducer from "./drawer.reducer";
import menuReducer from "./menu.reducer";
import modalReducer from "./modal.reducer";
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";

const rootReducer = combineReducers({
  authReducer,
  drawerReducer,
  menuReducer,
  userReducer,
  modalReducer,
  roleReducer,
});

export default rootReducer;
