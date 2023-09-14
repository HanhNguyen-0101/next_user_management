import { AuthAction, MenuAction, ModalAction } from "@/redux/actions";
import { MenuType } from "@/redux/models/menu";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Layout, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import LoadingComponent from "../loading";

const { Header, Content } = Layout;

export default function DashboardLayout({ children }: any) {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { menuData } = useSelector((state: any) => state.menuReducer);
  const { profile } = useSelector((state: any) => state.authReducer);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!profile) {
      router.push("/login");
    }
    setIsClient(true);
    dispatch(MenuAction.getAll());
  }, []);

  const handleLogout = async () => {
    await dispatch(AuthAction.logout());
  };

  const handleProfileModal = () => {
    dispatch(
      ModalAction.openModal({
        visible: true,
        FormComponent: <>122212122</>,
      })
    );
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
  let roleName = "";
  profile?.roleList?.map((name: string) => {
    roleName += `/ ${name}`;
  });
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <button className="font-bold" onClick={handleProfileModal}>
            {profile?.email}
          </button>
          <br />
          <i className="opacity-50">{roleName}</i>
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
          <Space>
            {profile?.firstName}
            {profile?.lastName}
          </Space>
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
