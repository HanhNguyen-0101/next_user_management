import DrapDropComponent from "@/components/drapDrop";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ModalAction, UserAction, UserRoleAction } from "@/redux/actions";
import { useState } from "react";
import { Divider, Space } from "antd";
import { IRoleModel } from "@/redux/models/role";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";

export default function AssignRoleForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { roleData } = useSelector((state: any) => state.roleReducer);
  const { user, query } = useSelector((state) => state.userReducer);

  const selectedRoles = user?.userRoles?.map(
    (i: { role: IRoleModel }) => i.role
  );
  const sourceRoles = roleData?.data?.filter(
    (role: IRoleModel) =>
      !selectedRoles?.map((i: IRoleModel) => i.id).includes(role.id)
  );

  const [state, setState] = useState({
    items: sourceRoles || [],
    selected: selectedRoles || [],
  });

  const data = {
    items: {
      droppableId: `${user?.id}_1`,
      data: state.items,
      columnTitle: "Roles",
    },
    selected: {
      droppableId: `${user?.id}_2`,
      data: state.selected,
      columnTitle: "Account's Roles",
      dragDisabledItem: 'user',
    },
  };
  const handleChange = async (data: any) => {
    setState(data);
    await dispatch(
      ModalAction.setCallbackModal(async () => {
        const { selected } = data;
        // Handle remove user-roles
        const roleRemovedArr = selectedRoles?.filter(
          (role: IRoleModel) =>
            !selected?.map((i: IRoleModel) => i.id).includes(role.id)
        );
        if (roleRemovedArr && roleRemovedArr.length) {
          roleRemovedArr.map(async (role: IRoleModel) => {
            await dispatch(
              UserRoleAction.removeItem({
                roleId: role.id,
                userId: user.id,
              })
            );
          });
        }
        // Handle add new user-roles
        const roleAddedArr = selected?.filter(
          (role: IRoleModel) =>
            !selectedRoles?.map((i: IRoleModel) => i.id).includes(role.id)
        );
        if (roleAddedArr && roleAddedArr.length) {
          roleAddedArr.map(async (role: IRoleModel) => {
            await dispatch(
              UserRoleAction.addItem({
                roleId: role.id,
                userId: user.id,
              })
            );
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "Assign role is successful!"
        );
        await dispatch(ModalAction.hideModal());
        await dispatch(UserAction.getAll(query));
      })
    );
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="sm:text-3xl text-2xl title-font font-medium text-center text-blueDark">
          <Space>
            {user?.firstName}
            {user?.lastName}
          </Space>
        </h1>
        <p className="text-sm leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          {user?.email}
        </p>
      </div>
      <Divider orientation="left" className="tracking-widest">
        Assign Role
        <span className="text-xs opacity-70"> (User role is default)</span>
      </Divider>
      <DrapDropComponent data={data} handleChange={handleChange} />
    </div>
  );
}
