export interface DrawerPayload {
  visible?: boolean | false,
  title?: string | '',
  FormComponent: null,
}

export interface ModalPayload {
  visible?: boolean | false,
  title?: string | '',
  FormComponent: null,
  hiddenSubmitBtn?: boolean | false,
}

export interface QueryPayload {
  page?: number | string,
  item_per_page?: string,
  sort?: {},
  search?: string,
}