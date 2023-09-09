import React, { Suspense, useState, useEffect } from "react";
import {
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Avatar,
  Space,
  Divider,
} from "antd";
import type { MenuProps } from "antd";
import LoadingComponent from "../loading";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Dispatch } from "redux";
import { AuthAction } from "@/redux/actions";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {

  }, [])
  
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div><Link href={'/'} className="font-bold">hanh@gmail.com</Link><br /><i className="opacity-50">Administrator</i></div>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <button type="button" onClick={() => handleLogout()}>
          Log out
        </button>
      ),
    },
  ];
  const itemsMenu = [
    {
      key: "1",
      label: "nav 1",
    },
    {
      key: "2",
      label: "nav 2",
    },
    {
      key: "3",
      label: "nav 3",
    },
  ]

  const handleLogout = () => {
    dispatch(AuthAction.logout());
    router.push("/login");
  };
  const handleOnSelectMenu = (data: any) => {
    router.push(`/dashboard/${data.key}`)
  }

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#17759F",
        }}
        className="shadow-lg"
      >
        <Dropdown menu={{ items }} placement="bottomRight">
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
        </Dropdown>
      </Header>
      <Content>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={30}
            style={{
              overflowY: "auto",
              maxHeight: "100vh",
              backgroundColor: "#f6f6f6",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="shadow-lg"
              style={{
                borderRadius: 0,
                backgroundColor: "white",
                position: "absolute",
                top: 50,
                right: 0,
                zIndex: 10,
              }}
            />
            <Suspense fallback={<LoadingComponent />}>
              <Menu
                mode="inline"
                style={{
                  backgroundColor: "#f6f6f6",
                  border: 0,
                  paddingRight: 30,
                }}
                className={collapsed ? "hidden" : "inline"}
                defaultSelectedKeys={["1"]}
                items={itemsMenu}
                onSelect={handleOnSelectMenu}
              />
            </Suspense>
          </Sider>
          <Layout className="relative">
            <Suspense fallback={<LoadingComponent />}>
              <Content
                className="shadow-lg"
                style={{
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                {children}
              </Content>
            </Suspense>
          </Layout>
        </Layout>
      </Content>
    </Layout>
  );
}
