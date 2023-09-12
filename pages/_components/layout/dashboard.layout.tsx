import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Avatar, Space } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import { Dispatch } from "redux";
import { AuthAction, MenuAction } from "@/redux/actions";
import { MenuType } from "@/redux/models/menu";
import LoadingComponent from "../loading";
import { DownOutlined } from "@ant-design/icons";
import { permissionTypes } from "pages/_utils/checkPermission";

const { Header, Content } = Layout;

export default function DashboardLayout({ children }: any) {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { menuData } = useSelector((state: any) => state.menuReducer);
  const { profile } = useSelector((state: any) => state.authReducer);
  const [isClient, setIsClient] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!profile) {
      router.push("/login");
    }
    setIsClient(true);
    dispatch(MenuAction.getAll());
  }, []);

  const handleLogout = async () => {
    await dispatch(AuthAction.logout());
    await router.push("/login");
  };

  const itemsMenu: any = [];
  if (menuData && menuData.data) {
    menuData.data.filter((menu: MenuType) => {
      if (!menu.parentId) {
        itemsMenu.push({
          key: menu.key,
          label: menu.name,
          type: "group",
        });
      }
    });
    itemsMenu.map((item: any) => {
      menuData.data.map((i: any) => {
        if (i?.parentMenu?.key === item.key) {
          const menuSub = {
            key: i.key,
            label: <Link href={`/dashboard/${i.key}`}>{i.name}</Link>,
          };
          if (!item.children) {
            item.children = [];
          }
          item.children.push(menuSub);
        }
      });
    });
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <Link href={"/"} className="font-bold">
            hanh@gmail.com
          </Link>
          <br />
          <i className="opacity-50">Administrator</i>
        </div>
      ),
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

  return profile && isClient ? (
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
        <Dropdown menu={{ items: itemsMenu }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Management Services
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
      <Content>
        <Layout className="relative">
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
        </Layout>
      </Content>
    </Layout>
  ) : (
    <LoadingComponent />
  );
}
