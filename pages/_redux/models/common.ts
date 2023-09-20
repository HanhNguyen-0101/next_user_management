export interface DrawerPayload {
  visible?: boolean | false,
  title?: string | '',
  FormComponent: any,
}

export interface ModalPayload {
  visible?: boolean | false,
  title?: string | '',
  FormComponent: any,
  actionText: string,
  hiddenSubmitBtn?: boolean | false,
}

export interface QueryPayload {
  page?: number | string,
  item_per_page?: number | string,
  sort?: {},
  search?: string,
}