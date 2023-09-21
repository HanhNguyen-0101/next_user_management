"use client";
import CreatePermissionForm from "@/components/forms/form-components/CreatePermissionForm";
import EditPermissionForm from "@/components/forms/form-components/EditPermissionForm";
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
  PermissionGroupAction,
} from "@/redux/actions";
import { PermissionState } from "@/redux/models/permission";
import { FilterFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Pagination, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PermissionDetail from "pages/_templates/PermissionDetail.template";
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
  description: string;
  code: string;
  permissionGroupId: string;
}
export default function PermissionMgmPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const { permissionData, query }: PermissionState = useSelector(
    (state: any) => state.permissionReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const hasEditPermission = hasPermission(
      permissionTypes.PERMISSION_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.PERMISSION_DELETE,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.PERMISSION_CREATE,
      profile?.permissionList
    );

  useEffect(() => {
    dispatch(PermissionAction.getAll({ ...query, page: 1 }));
  }, []);

  const handleSearch = (values: { search: string }) => {
    dispatch(PermissionAction.getAll({ ...query, ...values }));
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
    dispatch(PermissionAction.getAll({ ...query, page }));
  };
  const handleAddLineItem = () => {
    dispatch(PermissionGroupAction.getAll());
    dispatch(
      DrawerAction.openDrawer({
        visible: true,
        title: "ADD NEW PERMISSION",
        FormComponent: <CreatePermissionForm />,
      })
    );
  };
  const handleShowDetailLineItemBtn = () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      dispatch(
        PermissionAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      dispatch(
        ModalAction.openModal({
          visible: true,
          actionText: "Save",
          hiddenSubmitBtn: true,
          FormComponent: <PermissionDetail />,
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
        PermissionAction.getItemById({ id: selectedRowKeys[0].toString() })
      );
      await dispatch(PermissionGroupAction.getAll());
      await dispatch(
        DrawerAction.openDrawer({
          visible: true,
          title: "EDIT ROLE",
          FormComponent: <EditPermissionForm />,
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
      PermissionAction.removeItem({
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
          </Space>
          <Pagination
            onChange={onChangePagination}
            total={permissionData?.total}
            pageSize={ITEM_PER_PAGE}
            current={permissionData?.currentPage}
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
          title: "Code",
          dataIndex: "code",
          key: "code",
        },
        {
          title: "Permission Group",
          dataIndex: "permissionGroup",
          render: (value) => {
            return (
              <Tag color="geekblue" className="text-sm">
                {value?.name}
              </Tag>
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
            placeholder="Name, description, code"
          />
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={permissionData?.data.map((i) => {
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

PermissionMgmPage.getLayout = function getLayout(page: ReactElement) {
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
