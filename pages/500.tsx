import { ReactElement } from "react";
import ErrorLayout from "./_components/layout/error.layout";

export default function Custom500() {
  return (
    <div className="text-white -mt-40 text-center">
      <h1 className="text-9xl">500</h1>
      <p className="p-5">Server-side error occurred</p>
    </div>
  );
}
Custom500.getLayout = function getLayout(page: ReactElement) {
  return <ErrorLayout>{page}</ErrorLayout>;
};
