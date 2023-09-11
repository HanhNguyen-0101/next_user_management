export interface IUserModel {
  email: string;
  firstName: string;
  globalId?: string;
  id?: string;
  isDisable?: boolean;
  isPending?: boolean;
  isRegisteredWithGoogle?: boolean;
  lastName: string;
  officeCode?: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  updatedByUser?: IUserModel | null;
  userRoles?: {} | null;
}
export interface IUserArrayModel {
  data: Array<IUserModel>;
}

export interface UserState {
  userData?: {
    currentPage: number,
    data: Array<IUserModel>,
    nextPage: number,
    prevPage: number,
    total: number,
  } | null;
  error?: string | null;
  user?: IUserModel | null;
  deleteMsg?: string | null;
}

export interface GetUserByIdPayload {
  id: string
}
export interface GetUserResponse {
  data: IUserModel;
  status: number;
}

export interface DeleteUserByIdPayload {
  id: string
}
export interface DeleteUserResponse {
  data: string;
  status: number;
}
// export type GetSkillByIdFailure = {
//   type: typeof GET_SKILL_BY_ID_FAILURE;
//   payload: GetSkillByIdFailurePayload;
// };

// export type SkillActions =
//   | GetSkillByIdRequest
//   | GetSkillByIdSuccess
//   | GetSkillByIdFailure;