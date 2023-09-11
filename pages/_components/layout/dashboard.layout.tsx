import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Dispatch } from "redux";
import { AuthAction, MenuAction } from "@/redux/actions";
import { MenuType } from "@/redux/models/menu";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";
import LoadingComponent from "../loading";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { menuData } = useSelector((state: any) => state.menuReducer);
  const { profile } = useSelector((state: any) => state.authReducer);
  const [isClient, setIsClient] = useState(false)
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!profile) {
      router.push("/login");
    }
    setIsClient(true)
    dispatch(MenuAction.getAll());
  }, []);

  const itemsMenu: ItemType<MenuItemType>[] | { key: string; label: string }[] =
    [];
  if (menuData && menuData.data) {
    menuData.data.map((menu: MenuType) => {
      itemsMenu.push({
        key: menu.key,
        label: menu.name,
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

  const handleLogout = () => {
    dispatch(AuthAction.logout());
  };
  const handleOnSelectMenu = (data: any) => {
    router.push(`/dashboard/${data.key}`);
  };

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
          </Sider>
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
        </Layout>
      </Content>
    </Layout>
  ) : <LoadingComponent />;
}
