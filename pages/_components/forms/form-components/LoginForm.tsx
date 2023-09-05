import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { CheckboxField, InputField } from "../form-fields";
import Link from "next/link";
import * as en from "@/constants/locales/en/translation";

export default function LoginForm({ onLoginSubmit }) {
  const t = en;
  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        remember: false,
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string().email(t.error.emailInvalid).required("Required"),
        remember: Yup.boolean(),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onLoginSubmit(values);
      }}
    >
      <Form>
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Sign Up
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          Literally you probably haven't heard of them jean shorts.
        </p>
        <InputField
          label="Email"
          parentclassname="relative mb-4"
          lableclassname="leading-7 text-sm text-gray-600"
          type="email"
          name="email"
          className="w-full bg-white rounded border border-gray-300 focus:border-blueDark focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <InputField
          label="Password"
          parentclassname="relative mb-4"
          lableclassname="leading-7 text-sm text-gray-600"
          type="text"
          name="fullName"
          className="w-full bg-white rounded border border-gray-300 focus:border-blueDark focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />

        <div className="flex justify-between mb-4">
          <CheckboxField
            parentclassname="flex items-center"
            lableclassname="flex text-xs text-gray-500"
            name="remember"
            aria-label="Remember me"
            className="mr-1 rounded-sm focus:ri focus:dark:border-blueDark focus:ri accent-blueDark"
          >
            Remember me
          </CheckboxField>
          <Link href={"/"} className="text-xs text-blueDark">
            Forgot your password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blueDark my-2 py-2 px-8 focus:outline-none rounded border border-blueDark text-lg"
        >
          {t.login.signIn}
        </button>
        <button
          type="button"
          onClick={() => {
            alert("121222");
          }}
          className="w-full text-blueDark bg-white my-2 py-2 px-8 focus:outline-none hover:bg-slate-50 rounded border border-blueDark text-lg"
        >
          Sign in with Google
        </button>
        <p className="text-xs text-gray-500 mt-3">
          Literally you probably haven't heard of them jean shorts.{" "}
          <Link
            href={"/"}
            className="text-blueDark"
          >
            Sign in
          </Link>
        </p>
      </Form>
    </Formik>
  );
}
