import { USER_LOGIN } from "pages/_utils/configSetting";
import { AuthConstant } from "../constants";

const {
  LOGIN_SUCCESS,
  LOGIN_FAILUER,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILUER,
  REGISTER_FAILUER,
  REGISTER_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_SUCCESS,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAILURE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILUER,
} = AuthConstant;

let user = null;
if (typeof window !== "undefined") {
  const userLocal = localStorage.getItem(USER_LOGIN);
  if (userLocal) {
    user = JSON.parse(userLocal);
  }
}

const initState = {
  error: null,
  profile: user,
};

const authReducer = (
  state = initState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case LOGIN_SUCCESS: {
      const permissionListOfProfile: any[] = [];
      const roleListOfProfile: any[] = [];
      payload?.userRoles?.map((userRoleItem: any) => {
        roleListOfProfile.push(userRoleItem.role.name);
        userRoleItem?.role?.rolePermissions?.map((rolePermission: any) => {
          permissionListOfProfile.push(rolePermission.permission.name);
        });
      });

      const dataUserStore = {
        ...payload,
        permissionList: permissionListOfProfile,
        roleList: roleListOfProfile,
      };
      localStorage.setItem(USER_LOGIN, JSON.stringify(dataUserStore));
      return {
        ...state,
        profile: dataUserStore,
        error: initState.error,
      };
    }
    case LOGIN_FAILUER: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        profile: null,
        error: payload.message,
      };
    }
    case LOGIN_GOOGLE_SUCCESS: {
      const permissionListOfProfile: any[] = [];
      const roleListOfProfile: any[] = [];
      payload?.userRoles?.map((userRoleItem: any) => {
        roleListOfProfile.push(userRoleItem.role.name);
        userRoleItem?.role?.rolePermissions?.map((rolePermission: any) => {
          permissionListOfProfile.push(rolePermission.permission.name);
        });
      });

      const dataUserStore = {
        ...payload,
        permissionList: permissionListOfProfile,
        roleList: roleListOfProfile,
      };
      localStorage.setItem(USER_LOGIN, JSON.stringify(dataUserStore));
      return {
        ...state,
        profile: dataUserStore,
        error: initState.error,
      };
    }
    case LOGIN_GOOGLE_FAILUER: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        profile: null,
        error: payload.message,
      };
    }
    case REGISTER_SUCCESS: {
      return { ...state, error: initState.error };
    }
    case REGISTER_FAILUER: {
      return {
        ...state,
        error: payload.message,
      };
    }
    case LOGOUT_SUCCESS: {
      localStorage.removeItem(USER_LOGIN);
      return { ...state, profile: null };
    }
    case LOGOUT_FAILURE:
      return { ...state };
    case EDIT_PROFILE_SUCCESS: {
      const permissionListOfProfile: any[] = [];
      const roleListOfProfile: any[] = [];
      payload?.userRoles?.map((userRoleItem: any) => {
        roleListOfProfile.push(userRoleItem.role.name);
        userRoleItem?.role?.rolePermissions?.map((rolePermission: any) => {
          permissionListOfProfile.push(rolePermission.permission.name);
        });
      });

      const dataUserStore = {
        ...payload,
        permissionList: permissionListOfProfile,
        roleList: roleListOfProfile,
      };
      localStorage.setItem(USER_LOGIN, JSON.stringify(dataUserStore));
      return {
        ...state,
        profile: dataUserStore,
        error: initState.error,
      };
    }
    case EDIT_PROFILE_FAILURE: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        profile: null,
        error: payload.message,
      };
    }
    case DELETE_PROFILE_SUCCESS: {
      localStorage.removeItem(USER_LOGIN);
      return {
        ...state,
        profile: null,
      }
    }
    case DELETE_PROFILE_FAILURE: {
      return {
        ...state,
        error: payload.message,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return { ...state, error: initState.error };
    }
    case RESET_PASSWORD_FAILUER: {
      return {
        ...state,
        error: payload.message,
      };
    }
    default:
      return { ...state };
  }
};

export default authReducer;
