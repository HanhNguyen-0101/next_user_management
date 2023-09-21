import { AuthAction, MenuAction, ModalAction } from "@/redux/actions";
import { IMenuModel } from "@/redux/models/menu";
import { DownOutlined, SettingFilled } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, Layout, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import EditProfileForm from "../forms/form-components/EditProfileForm";
import LoadingComponent from "../loading";
import { tables } from "pages/_utils/checkPermission";

const { Header, Content } = Layout;

const handleMultipleLevel = (itemsMenu: any[], menuData: any[]) => {
  itemsMenu?.map((item: any) => {
    menuData?.map((i: any) => {
      if (i?.parentMenu?.key === item.key) {
        const menuSub = {
          key: i.key,
          label: <Link href={`/${i.key}`}>{i.name}</Link>,
        };
        if (!item.children) {
          item.children = [];
        }
        item.children.push(menuSub);
      }
    });
    handleMultipleLevel(item.children, menuData);
  });
};

export default function DashboardLayout({ children, fullWidth }: any) {
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { menuDataList } = useSelector((state: any) => state.menuReducer);
  const { profile } = useSelector((state: any) => state.authReducer);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!profile) {
      router.push("/");
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
        actionText: "Save",
        visible: true,
        FormComponent: <EditProfileForm />,
      })
    );
  };

  // Check view menu permission
  const menuViewedArr: IMenuModel[] = [];
  menuDataList?.data?.map((menu: IMenuModel) => {
  if (profile?.permissionList.includes(`${tables.VIEW_MENU}: ${menu.key}`)) {
      menuViewedArr.push(menu);
    }
  });

  const itemsMenu: any = [];
  if (menuViewedArr) {
    menuViewedArr.filter((menu: IMenuModel) => {
      if (!menu.parentId) {
        itemsMenu.push({
          key: menu.key,
          label: menu.name,
          type: "group",
        });
      }
    });
    handleMultipleLevel(itemsMenu, menuViewedArr);
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
      <Header className="flex items-center z-20 shadow-md bg-white fixed top-0 w-full">
        <div className="w-full m-auto md:px-8 px-5">
          <div className="inline-flex justify-center items-center align-middle">
            <Link href={"/user"} className="mr-4">
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
      <Content className="mt-20">
        <Layout
          className={`${
            !fullWidth && "max-w-[1260px]"
          } relative z-10 min-h-[280px] w-full  m-auto p-5`}
        >
          <Content className={`${!fullWidth && "shadow-lg"}`}>
            {children}
          </Content>
        </Layout>
      </Content>
    </Layout>
  ) : (
    <LoadingComponent />
  );
}
