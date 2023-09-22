"use client";
import CreateMenuForm from "@/components/forms/form-components/CreateMenuForm";
import EditMenuForm from "@/components/forms/form-components/EditMenuForm";
import SearchForm from "@/components/forms/form-components/SearchForm";
import DashboardLayout from "@/components/layout/dashboard.layout";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { DrawerAction, MenuAction } from "@/redux/actions";
import { IMenuModel, MenuState } from "@/redux/models/menu";
import { MinusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Pagination, Popconfirm, Space, Table, Tag } from "antd";
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

export default function MenuMgmPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { menuData, query }: MenuState = useSelector(
    (state: any) => state.menuReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const hasEditPermission = hasPermission(
      permissionTypes.MENU_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.MENU_DELETE,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.MENU_CREATE,
      profile?.permissionList
    );

  useEffect(() => {
    dispatch(MenuAction.getAll({ ...query, page: 1 }));
  }, []);

  const handleSearch = (values: { search: string }) => {
    dispatch(MenuAction.getAll({ ...query, ...values }));
  };

  const onChangePagination = (page: number) => {
    dispatch(MenuAction.getAll({ ...query, page }));
  };
  const handleAddLineItem = () => {
    dispatch(MenuAction.getAll());
    dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "ADD NEW MENU",
        FormComponent: <CreateMenuForm />,
      })
    );
  };
  const handleEditLineItemBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      await dispatch(
        MenuAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      await dispatch(
        DrawerAction.openDrawer({
          visible: true,
          title: "EDIT MENU",
          FormComponent: <EditMenuForm />,
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
      MenuAction.removeItem({
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
                okButtonProps={{ className: "bg-blueDark" }}
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
            total={menuData?.total}
            pageSize={ITEM_PER_PAGE}
            current={menuData?.currentPage}
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
          title: "Key",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "Parent Menu",
          dataIndex: "parentMenu",
          align: "center",
          render: (value: IMenuModel) => {
            return value ? (
              <Tag color="geekblue">{value.name}</Tag>
            ) : (
              <MinusOutlined className="text-gray-400" />
            );
          },
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

  const rowSelection: TableRowSelection<IMenuModel> = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className="flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative">
      <div className="flex flex-grow mb-3">
        <div className="mx-2 flex-1">
          <SearchForm onSearchSubmit={handleSearch} placeholder="Name, key" />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={menuData?.data.map((i) => {
          return { ...i, keyMenu: i.id };
        })}
        rowKey={"keyMenu"}
        scroll={{ x: 1200, y: window.innerHeight - 320 }}
        pagination={false}
        rowSelection={{ ...rowSelection, type: "radio" }}
        bordered
        rowClassName="cursor-pointer"
      />
    </div>
  );
}

MenuMgmPage.getLayout = function getLayout(page: ReactElement) {
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
