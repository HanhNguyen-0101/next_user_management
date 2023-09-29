"use client";
import DashboardLayout from "@/components/layout/dashboard.layout";
import {
  NOTIF_TYPE,
  openNotification,
} from "@/components/notification/notification";
import { MdmVslCntrAction } from "@/redux/actions";
import { IMdmVslCntrModel, MdmVslCntrState } from "@/redux/models/mdmVslCntr";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Pagination, PaginationProps, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { hasPermission, permissionTypes } from "pages/_utils/checkPermission";
import { ITEM_PER_PAGE } from "pages/_utils/constant";
import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

export default function MdmVslCntrMgmPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { mdmVslCntrData, query }: MdmVslCntrState = useSelector(
    (state: any) => state.mdmVslCntrReducer
  );
  const { profile } = useSelector((state: any) => state.authReducer);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const hasEditPermission = hasPermission(
      permissionTypes.MDM_VSL_CNTR_EDIT,
      profile?.permissionList
    ),
    hasDeletePermission = hasPermission(
      permissionTypes.MDM_VSL_CNTR_DELETE,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.MDM_VSL_CNTR_CREATE,
      profile?.permissionList
    );

  useEffect(() => {
    dispatch(MdmVslCntrAction.getAll({ ...query, page: 1 }));
  }, []);

  const handleSearch = (values: { search: string }) => {
    dispatch(MdmVslCntrAction.getAll({ ...query, ...values }));
  };
  const onChangePagination: PaginationProps['onChange'] = (current, pageSize) => {
    dispatch(MdmVslCntrAction.getAll({ ...query, page: current, item_per_page: pageSize }));
  };
  const handleAddLineItem = () => {
    router.push('/mdm_vsl_cntr/add');
};
  const handleShowDetailLineItemBtn = () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
      router.push(`/mdm_vsl_cntr/detail/${selectedRowKeys[0].toString()}`)
    } else {
      openNotification(
        NOTIF_TYPE.WARNING,
        "Please select only a row in the table!"
      );
    }
  };
  const handleEditLineItemBtn = async () => {
    if (selectedRowKeys && selectedRowKeys.length === 1) {
        router.push(`/mdm_vsl_cntr/edit/${selectedRowKeys[0].toString()}`)
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
      MdmVslCntrAction.removeItem({
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
            showSizeChanger
            onChange={onChangePagination}
            total={mdmVslCntrData?.total}
            current={mdmVslCntrData?.currentPage}
            className="text-right float-right"
            defaultPageSize={ITEM_PER_PAGE}
            pageSize={query && query.item_per_page ? query.item_per_page : ITEM_PER_PAGE}
          />
        </div>
      ),
      align: "left",
      key: "action",
      fixed: "left",
      children: [
        {
          title: "VESSEL CODE",
          dataIndex: "vsl_cd",
          key: "vsl_cd",
          fixed: "left",
        },
        {
          title: "VESSEL ENGLISH NAME",
          dataIndex: "vsl_eng_nm",
          key: "vsl_eng_nm",
          fixed: "left",
        },
        {
          title: "VESSEL CLASSIFICATION FLAG",
          dataIndex: "vsl_clss_flg",
          key: "vsl_clss_flg",
        },
        {
          title: "VESSEL LOCAL NAME",
          dataIndex: "vsl_locl_nm",
          key: "vsl_locl_nm",
        },
        {
          title: "FUEL OIL CAPACITY",
          dataIndex: "foil_capa",
          key: "foil_capa",
        },
        {
          title: "DIESEL OIL CAPACITY",
          dataIndex: "doil_capa",
          key: "doil_capa",
        },
        {
          title: "FRESH WATER CAPACITY",
          dataIndex: "frsh_wtr_capa",
          key: "frsh_wtr_capa",
        },
        {
          title: "CALL SIGN NUMBER",
          dataIndex: "call_sgn_no",
          key: "call_sgn_no",
        },
        {
          title: "REGISTRATION NUMBER",
          dataIndex: "rgst_no",
          key: "rgst_no",
        },
        {
          title: "PHONE NUMBER",
          dataIndex: "phn_no",
          key: "phn_no",
        },
      ],
    },
  ];

  const rowSelection: TableRowSelection<IMdmVslCntrModel> = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };
  return (
    <div className="flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative">
      <Table
        columns={columns}
        dataSource={mdmVslCntrData?.data.map((i) => {
          return { ...i, key: i.id };
        })}
        scroll={{ x: 1200, y: window.innerHeight - 300 }}
        pagination={false}
        rowSelection={{ ...rowSelection, type:'radio' }}
        bordered
        rowClassName="cursor-pointer"
      />
    </div>
  );
}

MdmVslCntrMgmPage.getLayout = function getLayout(page: ReactElement) {
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
