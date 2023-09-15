"use client";
import CreateUserForm from "@/components/forms/form-components/CreateUserForm";
import EditUserForm from "@/components/forms/form-components/EditUserForm";
import DashboardLayout from "@/components/layout/dashboard.layout";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { DrawerAction, ModalAction } from "@/redux/actions";
import { UserAction } from "@/redux/actions/user.action";
import { UserState } from "@/redux/models/user";
import {
  CheckOutlined,
  MinusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Pagination,
  Popconfirm,
  Popover,
  Space,
  Table,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import moment from "moment";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
export default function DashboardPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { userData, currentPage }: UserState = useSelector(
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
    );

  useEffect(() => {
    dispatch(UserAction.getAll());
  }, []);

  const onChangePagination = (page: number) => {
    dispatch(UserAction.getAll({ page }));
  };
  const handleShowDetail = () => {
    dispatch(
      ModalAction.openModal({
        visible: true,
        FormComponent: <>hello detail</>,
      })
    );
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
  const handleDeleteUser = async () => {
    await dispatch(
      UserAction.removeItem({ id: selectedRowKeys[0].toString(), page: currentPage })
    );
  };

  const columns: ColumnsType = [
    {
      title: (
        <Space>
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
          {hasDeletePermission && (
            <Button
              className="text-blueDark border-blueDark font-medium"
              onClick={handleAddUser}
            >
              Change Role
            </Button>
          )}
        </Space>
      ),
      align: "left",
      children: [
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
      ],
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    filters,
    sorter,
    extra
  ) => {
    console.log("params", filters, sorter, extra);
  };
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div className="flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative">
      <Table
        columns={columns}
        dataSource={userData?.data.map((i) => {
          return { ...i, key: i.id };
        })}
        onChange={onChange}
        scroll={{ x: true }}
        sticky={true}
        pagination={false}
        rowSelection={{ ...rowSelection }}
        bordered
        rowClassName="cursor-pointer"
        footer={() => (
          <Pagination
            onChange={onChangePagination}
            total={userData?.total}
            pageSize={ITEM_PER_PAGE}
            current={userData?.currentPage}
            className="text-right"
          />
        )}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: handleShowDetail,
          };
        }}
      />
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
