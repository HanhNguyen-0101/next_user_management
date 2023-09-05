import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "./_redux/configStore";
import "@/styles/globals.css";
import DrawerNav from "./_components/drawer/nav.drawer";
import { appWithTranslation } from "next-i18next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <DrawerNav />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
export default appWithTranslation(MyApp);
