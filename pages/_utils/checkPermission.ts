export const tables = {
  USER: "user",
};
export const permissionGroup = {
  VIEW: "view",
  EDIT: "update",
  DELETE: "delete",
  CREATE: "create",
};
export const permissionTypes = {
  USER_VIEW: `${tables.USER}: ${permissionGroup.VIEW}`,
  USER_EDIT: `${tables.USER}: ${permissionGroup.EDIT}`,
  USER_DELETE: `${tables.USER}: ${permissionGroup.DELETE}`,
  USER_CREATE: `${tables.USER}: ${permissionGroup.CREATE}`,
};
export const hasPermission = (type: any, permissionList: any) => {
  return permissionList.includes(type);
};