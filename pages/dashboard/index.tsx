"use client";
import React, { ReactElement } from "react";
import DashboardLayout from "@/components/layout/dashboard.layout";
import { Badge, Popconfirm, Popover, Space, Switch, Table } from "antd";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { ColumnsType, TableProps } from "antd/es/table";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useDispatch } from "react-redux";
import { AuthService } from "@/redux/services";
import { FormatDate } from "pages/_utils/formatData";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

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
  const dispatch = useDispatch();

  const handleEditRecord = (id: any) => {
    alert(id);
  };

  const handleDeleteRecord = (id: any) => {
    alert(id);
  };

  const data_1 = [
    {
      id: "1c9ce179-cc6e-4a3f-b722-c437b479c7a9",
      email: "123@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-09-07T09:00:46.173Z",
      updatedAt: "2023-09-08T08:40:51.662Z",
      updatedBy: "69d139fc-4762-42e6-92e9-1c9841c5a619",
      firstName: "Hanh 11",
      lastName: "Nguyen 11",
      globalId: "GID_02",
      officeCode: "OC_02",
      country: "EN",
      password: "$2b$10$kyeMIP1Ov4ru.zx3wO45XOem3xW2AIPF0Bs.qNe3rkIQQGN7cKobG",
      isRegisteredWithGoogle: false,
      updatedByUser: {
        id: "69d139fc-4762-42e6-92e9-1c9841c5a619",
        email: "alice.nguyen@yopmail.com",
        isPending: true,
        isDisable: false,
        createdAt: "2023-08-29T06:58:09.054Z",
        updatedAt: "2023-08-29T06:58:09.054Z",
        updatedBy: null,
        firstName: "Hanh",
        lastName: "Nguyen",
        globalId: "GID_00",
        officeCode: "OC_00",
        country: "EN",
        password:
          "$2b$10$b65nx5y.P5SX0QJZfLsNBuYajHukvMAQF8C.8r3raw7g56Sh4WbIm",
        isRegisteredWithGoogle: false,
      },
      userRoles: [
        {
          userId: "1c9ce179-cc6e-4a3f-b722-c437b479c7a9",
          roleId: "5def81ff-7333-491e-8048-658b9c0e378c",
          assignedAt: "2023-09-07T09:00:46.194Z",
        },
      ],
    },
    {
      id: "d4a6c90d-f162-486a-81e7-bca7bb218f99",
      email: "hanhnguyen0.0.0@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-09-06T09:31:55.073Z",
      updatedAt: "2023-09-06T09:31:55.073Z",
      updatedBy: null,
      firstName: "Hanh 11",
      lastName: "Nguyen 11",
      globalId: "GID_02",
      officeCode: "OC_02",
      country: "EN",
      password: "$2b$10$RBitMzpYvEui9WR9c4iITur39chRw7wWOehAr1wx6c9b80Q5WB1Pq",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [
        {
          userId: "d4a6c90d-f162-486a-81e7-bca7bb218f99",
          roleId: "5def81ff-7333-491e-8048-658b9c0e378c",
          assignedAt: "2023-09-06T09:31:55.646Z",
        },
      ],
    },
    {
      id: "597a052f-348e-4a1b-9e5e-ae8782baa401",
      email: "alice.nguyen.0.0@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-09-05T15:59:05.251Z",
      updatedAt: "2023-09-05T15:59:05.251Z",
      updatedBy: null,
      firstName: "Hanh 0.0.2",
      lastName: "Nguyen",
      globalId: "GID_00",
      officeCode: "OC_00",
      country: "EN",
      password: "$2b$10$KsCBhw.eiuSQ0GbrmB0du.V28eoQ0PRFo5Mo21zt5OeMy0XVvX3ue",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [
        {
          userId: "597a052f-348e-4a1b-9e5e-ae8782baa401",
          roleId: "5def81ff-7333-491e-8048-658b9c0e378c",
          assignedAt: "2023-09-05T15:59:05.288Z",
        },
      ],
    },
    {
      id: "d8bb9415-6e59-4234-9e82-48ed388039ef",
      email: "hanhnguyen.04@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-09-04T07:20:28.940Z",
      updatedAt: "2023-09-04T07:20:28.940Z",
      updatedBy: null,
      firstName: "Hanh 11",
      lastName: "Nguyen 11",
      globalId: "GID_02",
      officeCode: "OC_02",
      country: "EN",
      password: "$2b$10$oPxpT1l6atTThxY1Bp6UPeCYkst.eUV0ZuPwRBL2I2Ji1I32zMPRm",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [
        {
          userId: "d8bb9415-6e59-4234-9e82-48ed388039ef",
          roleId: "5def81ff-7333-491e-8048-658b9c0e378c",
          assignedAt: "2023-09-04T07:20:28.968Z",
        },
      ],
    },
    {
      id: "e3da576b-66da-4979-800d-03f4679b2d6f",
      email: "hanhnguyen.05@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-09-04T07:15:03.161Z",
      updatedAt: "2023-09-04T07:15:03.161Z",
      updatedBy: null,
      firstName: "Hanh 11",
      lastName: "Nguyen 11",
      globalId: "GID_02",
      officeCode: "OC_02",
      country: "EN",
      password: "$2b$10$FQ9CDJC/t.ZPMMSLlU1kQ.EPT9OMy4TOw9rDIKQjgETzMsJO.06XW",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [
        {
          userId: "e3da576b-66da-4979-800d-03f4679b2d6f",
          roleId: "5def81ff-7333-491e-8048-658b9c0e378c",
          assignedAt: "2023-09-04T07:15:03.181Z",
        },
      ],
    },
    {
      id: "a7908c39-b8d6-407f-b1a5-b6566434a601",
      email: "alice.nguyen.0@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-09-04T04:43:02.963Z",
      updatedAt: "2023-09-04T04:43:02.963Z",
      updatedBy: null,
      firstName: "Hanh",
      lastName: "Nguyen",
      globalId: "GID_00",
      officeCode: "OC_00",
      country: "EN",
      password: "$2b$10$/v6JAqPc0xsdJEdvkZ3.6Ohor66zIbvCk5BL7ViEvDtf4zVvvRX8u",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [],
    },
    {
      id: "69d139fc-4762-42e6-92e9-1c9841c5a619",
      email: "alice.nguyen@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-08-29T06:58:09.054Z",
      updatedAt: "2023-08-29T06:58:09.054Z",
      updatedBy: null,
      firstName: "Hanh",
      lastName: "Nguyen",
      globalId: "GID_00",
      officeCode: "OC_00",
      country: "EN",
      password: "$2b$10$b65nx5y.P5SX0QJZfLsNBuYajHukvMAQF8C.8r3raw7g56Sh4WbIm",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [
        {
          userId: "69d139fc-4762-42e6-92e9-1c9841c5a619",
          roleId: "f234efdc-e590-41e4-a190-04c651ab49d9",
          assignedAt: "2023-08-29T06:59:31.578Z",
        },
        {
          userId: "69d139fc-4762-42e6-92e9-1c9841c5a619",
          roleId: "5def81ff-7333-491e-8048-658b9c0e378c",
          assignedAt: "2023-08-29T07:21:46.908Z",
        },
        {
          userId: "69d139fc-4762-42e6-92e9-1c9841c5a619",
          roleId: "79f8fb19-e607-4014-8e96-0b7edf3d727d",
          assignedAt: "2023-08-29T07:22:07.297Z",
        },
        {
          userId: "69d139fc-4762-42e6-92e9-1c9841c5a619",
          roleId: "534442c7-27eb-44f4-96da-90a6b523c60b",
          assignedAt: "2023-08-29T07:22:39.167Z",
        },
      ],
    },
    {
      id: "f2a104c8-f422-43b3-a005-b29e6ec6facf",
      email: "hanhnguyen.learning@gmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-08-28T15:07:19.400Z",
      updatedAt: "2023-08-28T15:07:19.400Z",
      updatedBy: null,
      firstName: "Hanh",
      lastName: "Nguyen",
      globalId: null,
      officeCode: null,
      country: null,
      password: null,
      isRegisteredWithGoogle: true,
      updatedByUser: null,
      userRoles: [],
    },
    {
      id: "74aa3e14-8696-4dd7-a7a5-f9c17e27f50a",
      email: "hanhnguyen6@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-08-28T15:05:16.835Z",
      updatedAt: "2023-08-28T15:05:16.835Z",
      updatedBy: null,
      firstName: "Hanh",
      lastName: "Nguye",
      globalId: "GID_02",
      officeCode: "OC_02",
      country: "EN",
      password: "$2b$10$yWBO2dlbcTLklvLjloZ0ru/swezPSBCcHGYJFAw.RVcyiPPeUPDPq",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [],
    },
    {
      id: "22f04c73-0b86-4445-a134-5c929a6f5919",
      email: "hanhnguyen5@yopmail.com",
      isPending: true,
      isDisable: false,
      createdAt: "2023-08-28T14:41:35.083Z",
      updatedAt: "2023-08-28T14:41:35.083Z",
      updatedBy: null,
      firstName: "Dung",
      lastName: "Tran",
      globalId: "GID_02",
      officeCode: "OC_02",
      country: "EN",
      password: "$2b$10$COH5ltThOkT8omr4/JH8juPqHGGwbpaIZ1P45IAiEVPJiH9b7lDrq",
      isRegisteredWithGoogle: false,
      updatedByUser: null,
      userRoles: [],
    },
  ];

  const columns_1: ColumnsType<DataType> = [
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
      render: (value) => <Switch checked={value} disabled={true} />,
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
        return <></>;
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
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (value, record) => (
        <Space>
          <button
            className="text-xl text-blueDark pr-4"
            onClick={() => handleEditRecord(record.id)}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete item?"
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => handleDeleteRecord(record.id)}
            icon={<QuestionCircleOutlined className="text-red-600" />}
          >
            <button className="text-xl text-red-600">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="bg-white p-4 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h3>{t("homepage.title")}</h3>
      <Table
        columns={columns_1}
        dataSource={data_1}
        // dataSource={[]}
        onChange={onChange}
        scroll={{ x: true }}
        sticky={true}
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
