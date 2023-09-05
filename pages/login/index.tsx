"use client";
import { notFound } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { ReactElement, useEffect } from "react";
import Link from "next/link";
import { InputField, CheckboxField } from "@/components/forms/form-fields";
import { AuthAction } from '@/redux/actions';
import AuthLayout from '@/components/layout/auth.layout';
import LoginForm from '@/components/forms/form-components/LoginForm';
export default function LoginPage() {
  // const [user, setUser] = useState([]);

  const name = useSelector((state) => state.authReducer.name);
  console.log("8888888888", name);
  const dispatch = useDispatch();

  const handleSubmitForm = (values: any) => {
    alert(JSON.stringify(values));
  }

  useEffect(() => {
    dispatch(AuthAction.getDataService());

  }, []);
  if (!name) {
    notFound()
  }

  return (
    <div className="bg-white p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <LoginForm onLoginSubmit={handleSubmitForm} />
    </div>
  );
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  );
};
