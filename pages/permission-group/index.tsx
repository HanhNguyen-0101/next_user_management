"use client";
import CreatePermissionGroupForm from "@/components/forms/form-components/CreatePermissionGroupForm";
import EditPermissionGroupForm from "@/components/forms/form-components/EditPermissionGroupForm";
import SearchForm from "@/components/forms/form-components/SearchForm";
import DashboardLayout from "@/components/layout/dashboard.layout";
import {
    NOTIF_TYPE,
    openNotification,
} from "@/components/notification/notification";
import {
    DrawerAction,
    PermissionGroupAction
} from "@/redux/actions";
import { PermissionGroupState } from "@/redux/models/permissionGroup";
import { FilterFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Pagination, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
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
  name: string;
  createdAt: string;
  updatedAt: string;
}
export default function PermissionGroupMgmPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { permissionGroupData, query }: PermissionGroupState = useSelector(
    (state: any) => state.permissionGroupReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const hasEditPermission = hasPermission(
      permissionTypes.PERMISSION_GROUP_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.PERMISSION_GROUP_DELETE,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.PERMISSION_GROUP_CREATE,
      profile?.permissionList
    );

  useEffect(() => {
    dispatch(PermissionGroupAction.getAll({ ...query, page: 1 }));
  }, []);

  const handleSearch = (values: { search: string }) => {
    dispatch(PermissionGroupAction.getAll({ ...query, ...values }));
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
    dispatch(PermissionGroupAction.getAll({ ...query, page }));
  };
  const handleAddLineItem = () => {
    dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "ADD NEW PERMISSION GROUP",
        FormComponent: <CreatePermissionGroupForm />,
      })
    );
  };
  const handleEditLineItemBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      await dispatch(
        PermissionGroupAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      await dispatch(
        DrawerAction.openDrawer({
          visible: true,
          title: "EDIT ROLE",
          FormComponent: <EditPermissionGroupForm />,
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
  const handleDeleteLineItem = async () => {
    await dispatch(
      PermissionGroupAction.removeItem({
        id: selectedRowKeys[0].toString(),
        query,
      })
    );
  };

  const columns: ColumnsType = [
    {
      title: (
        <div className="h-[38px]">
          <Space>
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
          </Space>
          <Pagination
            onChange={onChangePagination}
            total={permissionGroupData?.total}
            pageSize={ITEM_PER_PAGE}
            current={permissionGroupData?.currentPage}
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
          title: "Created At",
          dataIndex: "createdAt",
          render: (value) => {
            return <span>{new FormatDate(value).toFullDate()}</span>;
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
            placeholder="Name"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={permissionGroupData?.data.map((i) => {
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

PermissionGroupMgmPage.getLayout = function getLayout(page: ReactElement) {
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
