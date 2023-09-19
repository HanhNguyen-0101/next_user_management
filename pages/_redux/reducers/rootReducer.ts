import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import drawerReducer from "./drawer.reducer";
import menuReducer from "./menu.reducer";
import modalReducer from "./modal.reducer";
import userReducer from "./user.reducer";
import roleReducer from "./role.reducer";
import userRoleReducer from "./userRole.reducer";
import permissionReducer from "./permission.reducer";
import rolePermissionReducer from "./rolePermission.reducer";

const rootReducer = combineReducers({
  authReducer,
  drawerReducer,
  menuReducer,
  userReducer,
  modalReducer,
  roleReducer,
  userRoleReducer,
  permissionReducer,
  rolePermissionReducer,
});

export default rootReducer;
