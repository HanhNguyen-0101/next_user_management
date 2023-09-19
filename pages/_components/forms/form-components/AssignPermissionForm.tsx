import DrapDropComponent from "@/components/drapDrop";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { ModalAction, RoleAction, RolePermissionAction } from "@/redux/actions";
import { IPermissionModel } from "@/redux/models/permission";
import { Divider } from "antd";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AssignPermissionForm() {
  const { t } = useTranslation(["common", "auth"]);
  const dispatch = useDispatch();
  const { permissionData } = useSelector(
    (state: any) => state.permissionReducer
  );
  const { role, query } = useSelector((state) => state.roleReducer);

  const selectedPermissions = role?.rolePermissions?.map(
    (i: { permission: IPermissionModel }) => i.permission
  );
  const sourcePermissions = permissionData?.data?.filter(
    (permission: IPermissionModel) =>
      !selectedPermissions
        ?.map((i: IPermissionModel) => i.id)
        .includes(permission.id)
  );

  const [state, setState] = useState({
    items: sourcePermissions || [],
    selected: selectedPermissions || [],
  });

  const data = {
    items: {
      droppableId: `${role?.id}_1`,
      data: state.items,
      columnTitle: "Permissions",
    },
    selected: {
      droppableId: `${role?.id}_2`,
      data: state.selected,
      columnTitle: "Role's Permissions",
    },
  };
  const handleChange = async (data: any) => {
    setState(data);
    await dispatch(
      ModalAction.setCallbackModal(async () => {
        const { selected } = data;
        // Handle remove user-roles
        const permissionRemovedArr = selectedPermissions?.filter(
          (permission: IPermissionModel) =>
            !selected
              ?.map((i: IPermissionModel) => i.id)
              .includes(permission.id)
        );
        if (permissionRemovedArr && permissionRemovedArr.length) {
          permissionRemovedArr.map(async (permission: IPermissionModel) => {
            await dispatch(
              RolePermissionAction.removeItem({
                roleId: role.id,
                permissionId: permission.id,
              })
            );
          });
        }
        // Handle add new user-roles
        const permissionAddedArr = selected?.filter(
          (permission: IPermissionModel) =>
            !selectedPermissions
              ?.map((i: IPermissionModel) => i.id)
              .includes(permission.id)
        );
        if (permissionAddedArr && permissionAddedArr.length) {
          permissionAddedArr.map(async (permission: IPermissionModel) => {
            await dispatch(
              RolePermissionAction.addItem({
                roleId: role.id,
                permissionId: permission.id,
              })
            );
          });
        }
        await openNotification(
          NOTIF_TYPE.SUCCESS,
          "Assign role is successful!"
        );
        await dispatch(ModalAction.hideModal());
        await dispatch(RoleAction.getAll(query));
      })
    );
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="sm:text-3xl text-2xl title-font font-medium text-center text-blueDark">
          {role?.name}
        </h1>
        <p className="text-sm leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
          {role?.description}
        </p>
      </div>
      <Divider orientation="left" className="tracking-widest">
        Assign Permissions
      </Divider>
      <DrapDropComponent data={data} handleChange={handleChange} />
    </div>
  );
}
