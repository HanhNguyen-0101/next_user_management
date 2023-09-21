"use client";
import AssignPermissionForm from "@/components/forms/form-components/AssignPermissionForm";
import CreateRoleForm from "@/components/forms/form-components/CreateRoleForm";
import EditRoleForm from "@/components/forms/form-components/EditRoleForm";
import SearchForm from "@/components/forms/form-components/SearchForm";
import DashboardLayout from "@/components/layout/dashboard.layout";
import {
    NOTIF_TYPE,
    openNotification,
} from "@/components/notification/notification";
import {
    DrawerAction,
    ModalAction,
    PermissionAction,
    RoleAction
} from "@/redux/actions";
import { RoleState } from "@/redux/models/role";
import {
    FilterFilled,
    QuestionCircleOutlined
} from "@ant-design/icons";
import {
    Button,
    Pagination,
    Popconfirm,
    Popover,
    Space,
    Table
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RoleDetail from "pages/_templates/RoleDetail.template";
import { hasPermission, permissionTypes } from "pages/_utils/checkPermission";
import { ITEM_PER_PAGE } from "pages/_utils/constant";
import { FormatDate } from "pages/_utils/formatData";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdByUser: string;
  updatedByUser: string;
  description: string;
}
export default function RoleMgmPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { roleData, query }: RoleState = useSelector(
    (state: any) => state.roleReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const hasEditPermission = hasPermission(
      permissionTypes.ROLE_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.ROLE_DELETE,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.ROLE_CREATE,
      profile?.permissionList
    ),
    hasAssignPermission =
      hasPermission(
        permissionTypes.ROLE_PERMISSION_ASSIGN,
        profile?.permissionList
      );

  useEffect(() => {
    dispatch(RoleAction.getAll({ ...query, page: 1 }));
  }, []);

  const handleSearch = (values: { search: string }) => {
    dispatch(RoleAction.getAll({ ...query, ...values }));
  };

  const handleFilter = async () => {
    // await dispatch(RoleAction.getAll());
    // await dispatch(
    //   ModalAction.openModal({
    //     visible: true,
    //     actionText: "Filter",
    //     FormComponent: <FilterUserForm />,
    //   })
    // );
  };
  const onChangePagination = (page: number) => {
    dispatch(RoleAction.getAll({ ...query, page }));
  };
  const handleAddLineItem = () => {
    dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "ADD NEW ROLE",
        FormComponent: <CreateRoleForm />,
      })
    );
  };
  const handleShowDetailLineItemBtn = () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      dispatch(RoleAction.getItemById({ id: selectedRowKeys[0].toString() }));
      dispatch(
        ModalAction.openModal({
          visible: true,
          actionText: "Save",
          hiddenSubmitBtn: true,
          FormComponent: <RoleDetail />,
        })
      );
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleEditLineItemBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      await dispatch(
        RoleAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      await dispatch(
        DrawerAction.openDrawer({
          visible: true,
          title: "EDIT ROLE",
          FormComponent: <EditRoleForm />,
        })
      );
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleDeleteLineItemBtn = () => {
    openNotification(NOTIF_TYPE.WARNING, "Please select a row in the table!");
  };
  const handleAssignPermissionBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
        await dispatch(
          RoleAction.getItemById({ id: selectedRowKeys[0].toString() })
        );
        await dispatch(PermissionAction.getAll());
        await dispatch(
          ModalAction.openModal({
            actionText: "Save",
            visible: true,
            FormComponent: <AssignPermissionForm />,
          })
        );
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleDeleteLineItem = async () => {
    await dispatch(
      RoleAction.removeItem({
        id: selectedRowKeys[0].toString(),
        query,
      })
    );
  };

  const columns: ColumnsType = [
    {
      title: (
        <div>
          <Space>
            <Button
              className="text-blueDark border-blueDark font-medium"
              onClick={handleShowDetailLineItemBtn}
            >
              Show Detail
            </Button>
            {hasAddPermission && (
              <Button
                className="text-blueDark border-blueDark font-medium"
                onClick={handleAddLineItem}
              >
                Add
              </Button>
            )}
            {hasEditPermission && (
              <Button
                className="text-blueDark border-blueDark font-medium"
                onClick={handleEditLineItemBtn}
              >
                Edit
              </Button>
            )}
            {hasDeletePermission && (
              <Popconfirm
                title="Are you sure to delete item/items?"
                description="All data related to this item will also be deleted."
                okText="Delete"
                okButtonProps={{className: 'bg-blueDark'}}
                cancelText="Cancel"
                disabled={!(selectedRowKeys && selectedRowKeys.length === 1)}
                onConfirm={handleDeleteLineItem}
                icon={<QuestionCircleOutlined className="text-red-600" />}
              >
                <Button
                  className="text-blueDark border-blueDark font-medium"
                  onClick={
                    !(selectedRowKeys && selectedRowKeys.length === 1)
                      ? handleDeleteLineItemBtn
                      : () => {}
                  }
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
            {hasAssignPermission && (
              <Button
                className="text-blueDark border-blueDark font-medium"
                onClick={handleAssignPermissionBtn}
              >
                Assign Permission
              </Button>
            )}
          </Space>
          <Pagination
            onChange={onChangePagination}
            total={roleData?.total}
            pageSize={ITEM_PER_PAGE}
            current={roleData?.currentPage}
            className="text-right float-right"
          />
        </div>
      ),
      align: "left",
      key: "action",
      fixed: "left",
      children: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (value) => {
            return <span>{new FormatDate(value).toFullDate()}</span>;
          },
        },
        {
          title: "Created By",
          dataIndex: "createdByUser",
          render: (value) => {
            return (
              <Popover content={value?.email}>
                <Space className="cursor-pointer">
                  <span>{value?.firstName}</span>
                  <span>{value?.lastName}</span>
                </Space>
              </Popover>
            );
          },
        },
        {
          title: "Updated At",
          dataIndex: "updatedAt",
          render: (value) => {
            return <span>{new FormatDate(value).toFullDate()}</span>;
          },
        },
        {
          title: "Updated By",
          dataIndex: "updatedByUser",
          render: (value) => {
            return (
              <Popover content={value?.email}>
                <Space className="cursor-pointer">
                  <span>{value?.firstName}</span>
                  <span>{value?.lastName}</span>
                </Space>
              </Popover>
            );
          },
        },
      ],
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className="flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative">
      <div className="flex flex-grow mb-3">
        <button
          onClick={handleFilter}
          className="w-[40px] h-[40px] rounded-full bg-blueDark text-white text-base mx-2"
        >
          <FilterFilled />
        </button>
        <div className="mx-2 flex-1 h-8">
          <SearchForm
            onSearchSubmit={handleSearch}
            placeholder="Name, description"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={roleData?.data.map((i) => {
          return { ...i, key: i.id };
        })}
        scroll={{ x: 1200, y: window.innerHeight - 320 }}
        pagination={false}
        rowSelection={{ ...rowSelection, type:'radio' }}
        bordered
        rowClassName="cursor-pointer"
      />
    </div>
  );
}

RoleMgmPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translationsProps = await serverSideTranslations(locale ?? "en", [
    "common",
  ]);

  return {
    props: {
      ...translationsProps,
    },
  };
};
