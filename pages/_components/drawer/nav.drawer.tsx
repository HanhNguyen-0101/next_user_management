// import React from "react";
// import { Drawer, Space, Button } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// // import { useTranslation } from "react-i18next";

// export default function DrawerNav() {
//   const { visible, title, FormComponent, submitAction } = useSelector(
//     (state: any) => state.drawer
//   );

//   const dispatch = useDispatch();
// //   const { t } = useTranslation();

//   const onClose = () => {
//     // dispatch(hideDrawer());
//   };
//   return (
//     <Drawer
//       title={<span className="text-amber-700">{title}</span>}
//       placement="right"
//       visible={visible}
//       closable={false}
//       size="large"
//       className="drawer"
//       footer={
//         <Space>
//           <Button className="capitalize" onClick={onClose}>{t("cancel")}</Button>
//           <Button type="primary" className="capitalize" onClick={submitAction}>
//             {t("confirm")}
//           </Button>
//         </Space>
//       }
//       footerStyle={{ textAlign: "left", backgroundColor: "#ffc700", borderColor: "transparent" }}
//       headerStyle={{ backgroundColor: "#ffc700", borderColor: "transparent" }}
//       bodyStyle={{ backgroundColor: "#fffde6" }}
//     >
//       {FormComponent}
//     </Drawer>
//   );
// }