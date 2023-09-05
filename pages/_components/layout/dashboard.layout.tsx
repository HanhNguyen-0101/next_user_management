import { Suspense, useState } from "react";
import {
  LeftOutlined,
  RightOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Avatar } from "antd";
import type { MenuProps } from "antd";
import LoadingComponent from "../loading";

const { Header, Sider, Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
export default function DashboardLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
                items={[
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: "nav 1",
                  },
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "nav 2",
                  },
                  {
                    key: "3",
                    icon: <UploadOutlined />,
                    label: "nav 3",
                  },
                ]}
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
