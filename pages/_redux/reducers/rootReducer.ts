import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import drawerReducer from "./drawer.reducer";
import menuReducer from "./menu.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  authReducer,
  drawerReducer,
  menuReducer,
  userReducer,
});

export default rootReducer;
