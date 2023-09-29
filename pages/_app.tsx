import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/en_US";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import DrawerNav from "./_components/drawer/nav.drawer";
import ModalCustom from "./_components/modal/modalCustom";
import { store } from "./_redux/configStore";
config.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ConfigProvider
          locale={locale}
          theme={{
            token: {
              colorPrimary: "#274a74",
              borderRadius: 2,
              controlHeight: 38,
            },
            components: {
              Tabs: {
                inkBarColor: "white",
                colorPrimary: "white",
                colorText: "rgba(256, 256, 256, 0.5)",
                verticalItemMargin: "0 0 0 0",
                cardBg: "white",
              },
              Collapse: {
                padding: 0,
              },
              DatePicker: {
                colorLink: "#274a74",
                colorLinkHover: "#274a74",
              },
            },
          }}
        >
          <DrawerNav />
          <ModalCustom />
          {getLayout(<Component {...pageProps} />)}
        </ConfigProvider>
      </Provider>
    </SessionProvider>
  );
}
export default appWithTranslation(MyApp);
