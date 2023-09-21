export const tables = {
  USER: "user",
  USER_ROLE: "user-role",
  ROLE: "role",
  ROLE_PERMISSION: "role-permission",
  PERMISSION: "permission",
  PERMISSION_GROUP: "permission-group",
  MENU: "menu",
  MDM_VSL_CNTR: "mdm-vsl-cntr",
  VIEW_MENU: "view-menu",
};
export const permissionGroup = {
  VIEW: "view",
  EDIT: "update",
  DELETE: "delete",
  CREATE: "create",
  ASSIGN: "assign"
};
export const permissionTypes = {
  USER_EDIT: `${tables.USER}: ${permissionGroup.EDIT}`,
  USER_DELETE: `${tables.USER}: ${permissionGroup.DELETE}`,
  USER_CREATE: `${tables.USER}: ${permissionGroup.CREATE}`,
  USER_ROLE_ASSIGN: `${tables.USER_ROLE}: ${permissionGroup.ASSIGN}`,

  ROLE_EDIT: `${tables.ROLE}: ${permissionGroup.EDIT}`,
  ROLE_DELETE: `${tables.ROLE}: ${permissionGroup.DELETE}`,
  ROLE_CREATE: `${tables.ROLE}: ${permissionGroup.CREATE}`,
  ROLE_PERMISSION_ASSIGN: `${tables.ROLE_PERMISSION}: ${permissionGroup.ASSIGN}`,

  PERMISSION_EDIT: `${tables.PERMISSION}: ${permissionGroup.EDIT}`,
  PERMISSION_DELETE: `${tables.PERMISSION}: ${permissionGroup.DELETE}`,
  PERMISSION_CREATE: `${tables.PERMISSION}: ${permissionGroup.CREATE}`,

  PERMISSION_GROUP_EDIT: `${tables.PERMISSION_GROUP}: ${permissionGroup.EDIT}`,
  PERMISSION_GROUP_DELETE: `${tables.PERMISSION_GROUP}: ${permissionGroup.DELETE}`,
  PERMISSION_GROUP_CREATE: `${tables.PERMISSION_GROUP}: ${permissionGroup.CREATE}`,

  MENU_EDIT: `${tables.MENU}: ${permissionGroup.EDIT}`,
  MENU_DELETE: `${tables.MENU}: ${permissionGroup.DELETE}`,
  MENU_CREATE: `${tables.MENU}: ${permissionGroup.CREATE}`,

  MDM_VSL_CNTR_EDIT: `${tables.MDM_VSL_CNTR}: ${permissionGroup.EDIT}`,
  MDM_VSL_CNTR_DELETE: `${tables.MDM_VSL_CNTR}: ${permissionGroup.DELETE}`,
  MDM_VSL_CNTR_CREATE: `${tables.MDM_VSL_CNTR}: ${permissionGroup.CREATE}`,
};
export const hasPermission = (type: any, permissionList: any) => {
  return permissionList.includes(type);
};
