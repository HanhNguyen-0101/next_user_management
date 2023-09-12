"use client";
import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard.layout";
import { Badge, Popconfirm, Popover, Space, Table, Tooltip } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { ColumnsType, TableProps } from "antd/es/table";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "@/redux/services";
import { FormatDate } from "pages/_utils/formatData";
import { MinusOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { UserAction } from "@/redux/actions/user.action";
import { Dispatch } from "redux";
import {
  DeleteUserByIdPayload,
  GetUserByIdPayload,
  UserState,
} from "@/redux/models/user";
import { DrawerAction } from "@/redux/actions";
import CreateUserForm from "@/components/forms/form-components/CreateUserForm";
import { hasPermission, permissionTypes } from "pages/_utils/checkPermission";
import EditUserForm from "@/components/forms/form-components/EditUserForm";

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

export default function DashboardPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { userData }: UserState = useSelector(
    (state: any) => state.userReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    dispatch(UserAction.getAll());
  }, []);

  const handleAddUser = () => {
    dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "Edit User",
        FormComponent: <CreateUserForm onCreateUserSubmit={handleSubmitAddUserForm} />,
        // submitAction: handleSubmitAddUserForm,
      })
    );
  };
  const handleEditRecord = async (values: GetUserByIdPayload) => {
    await dispatch(UserAction.getItemById(values));
    await dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "Edit User",
        FormComponent: <EditUserForm onEditUserSubmit={handleSubmitEditUserForm} />,
        submitAction: handleSubmitEditUserForm,
      })
    );
  };

  const handleSubmitAddUserForm = (values: any) => {
    console.log("-----add--------", values);
  };
  const handleSubmitEditUserForm = (values: any) => {
    console.log("------edit-------", values);
  };
  const handleDeleteRecord = (values: DeleteUserByIdPayload) => {
    dispatch(UserAction.removeItem(values));
  };

  const columns: ColumnsType = [
    {
      title: "UserID",
      dataIndex: "id",
      fixed: "left",
      width: 80,
      render: (value): ReactElement => {
        return (
          <Popover
            content={value}
            className="w-10 block overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <span className="cursor-pointer">{value}</span>
          </Popover>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      fixed: "left",
      sorter: {
        compare: (a, b) => {
          return a.email.localeCompare(b.email);
        },
        multiple: 1,
      },
    },
    {
      title: "Firstname",
      dataIndex: "firstName",
      sorter: {
        compare: (a, b) => {
          return a.firstName.localeCompare(b.firstName);
        },
        multiple: 2,
      },
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      sorter: {
        compare: (a, b) => {
          return a.lastName.localeCompare(b.lastName);
        },
        multiple: 3,
      },
    },
    {
      title: "Disable",
      dataIndex: "isDisable",
      width: 100,
      align: "center",
      render: (value) => {
        const statusText = value ? "Disable" : "Active";
        const status = value ? "error" : "success";
        return <Badge status={status} text={statusText} />;
      },
      filters: [
        {
          text: "Disable",
          value: true,
        },
        {
          text: "Enable",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isDisable === value,
    },
    {
      title: "Registered With Google",
      dataIndex: "isRegisteredWithGoogle",
      width: 200,
      align: "center",
      render: (value) =>
        value ? (
          <span className="text-green-600 font-bold text-lg">
            <CheckOutlined />
          </span>
        ) : (
          <MinusOutlined className="text-gray-400" />
        ),
      filters: [
        {
          text: "Registered via Google",
          value: true,
        },
        {
          text: "Registered Without Google",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isRegisteredWithGoogle === value,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a, b) => {
        return moment(a.createdAt).diff(moment(b.createdAt));
      },
      render: (value) => {
        return <span>{new FormatDate(value).toFullDate()}</span>;
      },
    },
    {
      title: "Updated By",
      dataIndex: "updatedByUser",
      width: 150,
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
      sorter: (a, b) => {
        return moment(a.updatedAt).diff(moment(b.updatedAt));
      },
    },
  ];
  const hasEditPermission = hasPermission(
      permissionTypes.USER_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.USER_DELETE,
      profile?.permissionList
    );

  if (hasDeletePermission || hasEditPermission) {
    columns.push({
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (value, record) => {
        return (
          <Space>
            {hasEditPermission && (
              <button
                className="text-xl text-blueDark pr-4"
                onClick={() => handleEditRecord(record)}
              >
                <EditOutlined />
              </button>
            )}
            {hasDeletePermission && (
              <Popconfirm
                title="Are you sure to delete item?"
                okText="Delete"
                cancelText="Cancel"
                onConfirm={() => handleDeleteRecord(record)}
                icon={<QuestionCircleOutlined className="text-red-600" />}
              >
                <button className="text-xl text-red-600">
                  <DeleteOutlined />
                </button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    });
  }
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="bg-white p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative">
      <h3>{t("homepage.title")}</h3>
      <Table
        columns={columns}
        dataSource={userData?.data}
        onChange={onChange}
        scroll={{ x: true }}
        sticky={true}
        className="mb-8"
      />
      {hasPermission(permissionTypes.USER_CREATE, profile?.permissionList) && (
        <Tooltip title="Add new User">
          <button
            className="fixed z-20 bottom-5 right-5 shadow-md w-14 h-14 bg-blueDark rounded-full text-lg text-white"
            onClick={handleAddUser}
          >
            <PlusOutlined />
          </button>
        </Tooltip>
      )}
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
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
