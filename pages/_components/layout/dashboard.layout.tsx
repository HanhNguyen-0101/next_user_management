import { AuthAction, MenuAction, ModalAction } from "@/redux/actions";
import { MenuType } from "@/redux/models/menu";
import {
  DownOutlined,
  SettingFilled,
  SearchOutlined,
  FilterFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Input, Layout, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import LoadingComponent from "../loading";
import EditProfileForm from "../forms/form-components/EditProfileForm";
import Image from "next/image";
import SearchForm from "../forms/form-components/SearchForm";

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
        FormComponent: <EditProfileForm />,
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
    roleName += `${name}/ `;
  });
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button className="font-bold" onClick={handleProfileModal}>
          My account
        </button>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <button className="font-bold" onClick={() => handleLogout()}>
          Log out
        </button>
      ),
    },
  ];

  return profile && isClient ? (
    <Layout className="h-full min-h-screen">
      <Header className="flex items-center z-20 shadow-md bg-white">
        <div className="w-full m-auto md:px-8 px-5">
          <div className="inline-flex justify-center items-center align-middle">
            <Link href={"/dashboard"} className="mr-4">
              <Image
                src={"/images/logo.png"}
                alt={"logo"}
                width={150}
                height={30}
              />
            </Link>
            <Dropdown menu={{ items: itemsMenu }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="text-blueDark font-medium text-base">
                  Management Services
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="float-right items-center">
            <Dropdown menu={{ items }} placement="bottomRight" className="ml-2">
              <Avatar
                size={40}
                className="bg-blueDark"
                icon={<SettingFilled />}
              />
            </Dropdown>
          </div>
        </div>
      </Header>
      <Content>
        <Layout className="relative z-10 min-h-[280px] w-full max-w-[1260px] m-auto p-5">
          <Content className="shadow-lg">{children}</Content>
        </Layout>
      </Content>
    </Layout>
  ) : (
    <LoadingComponent />
  );
}
