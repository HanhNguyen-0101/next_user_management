import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "./_redux/configStore";
import "@/styles/globals.css";
import DrawerNav from "./_components/drawer/nav.drawer";
import { appWithTranslation } from "next-i18next";
import { ConfigProvider } from "antd";
import ModalCustom from "./_components/modal/modalCustom";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#274a74",
            borderRadius: 2,
            controlHeight: 38,   
          },
        }}
      >
        <DrawerNav />
        <ModalCustom />
        {getLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </Provider>
  );
}
export default appWithTranslation(MyApp);
