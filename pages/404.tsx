import { ReactElement } from "react";
import ErrorLayout from "./_components/layout/error.layout";

export default function Custom404() {
  return (
    <div className="text-white -mt-40 text-center">
      <h1 className="text-9xl">404</h1>
      <p className="p-5">Page Not Found</p>
    </div>
  );
}
Custom404.getLayout = function getLayout(page: ReactElement) {
  return <ErrorLayout>{page}</ErrorLayout>;
};
