"use client";
import AssignRoleForm from "@/components/forms/form-components/AssignRoleForm";
import CreateUserForm from "@/components/forms/form-components/CreateUserForm";
import EditUserForm from "@/components/forms/form-components/EditUserForm";
import FilterUserForm from "@/components/forms/form-components/FilterUserForm";
import SearchForm from "@/components/forms/form-components/SearchForm";
import DashboardLayout from "@/components/layout/dashboard.layout";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import {
  DrawerAction,
  ModalAction,
  RoleAction,
  UserAction,
} from "@/redux/actions";
import { IRoleModel } from "@/redux/models/role";
import { UserState } from "@/redux/models/user";
import {
  CheckOutlined,
  MinusOutlined,
  QuestionCircleOutlined,
  FilterFilled,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Pagination,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserDetail from "pages/_templates/UserDetail.template";
import { hasPermission, permissionTypes } from "pages/_utils/checkPermission";
import { ITEM_PER_PAGE } from "pages/_utils/constant";
import { FormatDate } from "pages/_utils/formatData";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

interface DataType {
  key: React.Key;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isDisable: boolean;
  createdAt: string;
  updatedAt: string;
  updatedByUser: string;
  password: string;
  isRegisteredWithGoogle: boolean;
}
export default function UserMgmPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { userData, query }: UserState = useSelector(
    (state: any) => state.userReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const hasEditPermission = hasPermission(
      permissionTypes.USER_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.USER_DELETE,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.USER_CREATE,
      profile?.permissionList
    ),
    hasAssignRole = hasPermission(
      permissionTypes.USER_ROLE_ASSIGN,
      profile?.permissionList
    );

  useEffect(() => {
    dispatch(UserAction.getAll({ ...query, page: 1 }));
  }, []);

  const handleSearch = (values) => {
    dispatch(UserAction.getAll({ ...query, ...values }));
  };
  const handleFilter = async() => {
    await dispatch(RoleAction.getAll());
    await dispatch(
      ModalAction.openModal({
        visible: true,
        actionText: "Filter",
        FormComponent: <FilterUserForm />,
      })
    );
  };

  const onChangePagination = (page: number) => {
    dispatch(UserAction.getAll({ ...query, page }));
  };
  const handleAddUser = () => {
    dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "Add User",
        FormComponent: <CreateUserForm />,
      })
    );
  };
  const handleShowDetailUserBtn = () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      dispatch(UserAction.getItemById({ id: selectedRowKeys[0].toString() }));
      dispatch(
        ModalAction.openModal({
          visible: true,
          actionText: "Save",
          hiddenSubmitBtn: true,
          FormComponent: <UserDetail />,
        })
      );
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleEditUserBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      await dispatch(
        UserAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      await dispatch(
        DrawerAction.openDrawer({
          visible: true,
          title: "Edit User",
          FormComponent: <EditUserForm />,
        })
      );
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleDeleteUserBtn = () => {
    openNotification(NOTIF_TYPE.WARNING, "Please select a row in the table!");
  };
  const handleAssignRoleBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      await dispatch(
        UserAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      await dispatch(RoleAction.getAll());
      await dispatch(
        ModalAction.openModal({
          actionText: "Save",
          visible: true,
          FormComponent: <AssignRoleForm />,
        })
      );
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleDeleteUser = async () => {
    await dispatch(
      UserAction.removeItem({
        id: selectedRowKeys[0].toString(),
      })
    );
    await openNotification(NOTIF_TYPE.SUCCESS, "User is deleted succesfully");
    await dispatch(UserAction.getAll(query));
  };

  const columns: ColumnsType = [
    {
      title: (
        <div>
          <Space>
            <Button
              className="text-blueDark border-blueDark font-medium"
              onClick={handleShowDetailUserBtn}
            >
              Show Detail
            </Button>
            {hasAddPermission && (
              <Button
                className="text-blueDark border-blueDark font-medium"
                onClick={handleAddUser}
              >
                Add
              </Button>
            )}
            {hasEditPermission && (
              <Button
                className="text-blueDark border-blueDark font-medium"
                onClick={handleEditUserBtn}
              >
                Edit
              </Button>
            )}
            {hasDeletePermission && (
              <Popconfirm
                title="Are you sure to delete item/items?"
                description="All data related to this account will also be deleted."
                okText="Delete"
                cancelText="Cancel"
                disabled={!(selectedRowKeys && selectedRowKeys.length === 1)}
                onConfirm={handleDeleteUser}
                icon={<QuestionCircleOutlined className="text-red-600" />}
              >
                <Button
                  className="text-blueDark border-blueDark font-medium"
                  onClick={
                    !(selectedRowKeys && selectedRowKeys.length === 1)
                      ? handleDeleteUserBtn
                      : () => {}
                  }
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
            {hasAssignRole && (
              <Button
                className="text-blueDark border-blueDark font-medium"
                onClick={handleAssignRoleBtn}
              >
                Assign Role
              </Button>
            )}
          </Space>
          <Pagination
            onChange={onChangePagination}
            total={userData?.total}
            pageSize={ITEM_PER_PAGE}
            current={userData?.currentPage}
            className="text-right float-right"
          />
        </div>
      ),
      align: "left",
      key: "action",
      fixed: "left",
      children: [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "First Name",
          dataIndex: "firstName",
          key: "firstName",
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          key: "lastName",
        },
        {
          title: "Roles",
          dataIndex: "userRoles",
          align: "center",
          key: "userRoles",
          render: (value) => {
            return value?.map((role: { role: IRoleModel }) => (
              <Tag
                key={role?.role.name}
                className="uppercase text-xs font-medium"
                color="geekblue"
              >
                {role?.role?.name}
              </Tag>
            ));
          },
        },
        {
          title: "Disabled",
          dataIndex: "isDisable",
          align: "center",
          render: (value) => {
            const statusText = value ? "Disable" : "Active";
            const status = value ? "error" : "success";
            return <Badge status={status} text={statusText} />;
          },
        },
        {
          title: "Registered With Google",
          dataIndex: "isRegisteredWithGoogle",
          align: "center",
          render: (value) =>
            value ? (
              <span className="text-green-600 font-bold text-lg">
                <CheckOutlined />
              </span>
            ) : (
              <MinusOutlined className="text-gray-400" />
            ),
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (value) => {
            return <span>{new FormatDate(value).toFullDate()}</span>;
          },
        },
        {
          title: "Updated By",
          dataIndex: "updatedByUser",
          align: "center",
          render: (value) => {
            if (value) {
              return (
                <Popover content={value.email}>
                  <Space className="cursor-pointer">
                    <span>{value.firstName}</span>
                    <span>{value.lastName}</span>
                  </Space>
                </Popover>
              );
            }
            return <MinusOutlined className="text-gray-400" />;
          },
        },
        {
          title: "Updated At",
          dataIndex: "updatedAt",
          render: (value) => {
            return <span>{new FormatDate(value).toFullDate()}</span>;
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
            placeholder="Email, First name, Last name, globalId, officeCode, country"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={userData?.data.map((i) => {
          return { ...i, key: i.id };
        })}
        scroll={{ x: 1200, y: window.innerHeight - 320 }}
        pagination={false}
        rowSelection={{ ...rowSelection }}
        bordered
        rowClassName="cursor-pointer"
      />
    </div>
  );
}

UserMgmPage.getLayout = function getLayout(page: ReactElement) {
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
