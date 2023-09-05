"use client";
import { notFound } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { ReactElement, useEffect } from "react";
import { AuthAction } from "@/redux/actions";
import DashboardLayout from "@/components/layout/dashboard.layout";
import LoginForm from "@/components/forms/form-components/LoginForm";

export default function LoginPage() {
  // const [user, setUser] = useState([]);

  const name = useSelector((state) => state.authReducer.name);
  const dispatch = useDispatch();

  const handleSubmitForm = (values: any) => {
    alert(JSON.stringify(values));
  };

  useEffect(() => {
    dispatch(AuthAction.getDataService());
  }, []);
  if (!name) {
    notFound();
  }

  return (
    <div className="bg-white p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      {/* <LoginForm onLoginSubmit={handleSubmitForm} /> */}
    </div>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
