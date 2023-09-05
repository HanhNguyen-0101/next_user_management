import { notification } from "antd";

export const NOTIF_TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
};
export const NOTIF_POSITION = {
  TOP_RIGHT: 'topRight',
  TOP_LEFT: 'topLeft',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
};
export const openNotification = (
  type = NOTIF_TYPE.INFO,
  message = "",
  description = "",
  placement = NOTIF_POSITION.TOP_RIGHT
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};
