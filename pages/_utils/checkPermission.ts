export const tables = {
  USER: "user",
  USER_ROLE: "user-role",
  ROLE: "role",
  ROLE_PERMISSION: "role-permission",
  PERMISSION: "permission",
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
};
export const hasPermission = (type: any, permissionList: any) => {
  return permissionList.includes(type);
};
