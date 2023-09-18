import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import * as Yup from "yup";

export default function SearchForm({
  onSearchSubmit,
  placeholder,
}: {
  onSearchSubmit: (payload: any) => void;
  placeholder: string;
}) {
  const { t } = useTranslation(["common", "auth"]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      search: "",
    },
    validationSchema: Yup.object({
      search: Yup.string().max(
        200,
        t("error.charactersInvalid", { number: 200 })
      ),
    }),
    onSubmit: async (values) => {
      await onSearchSubmit(values);
      await formik.setSubmitting(false);
    },
  });
  return (
    <Form layout="vertical" colon={false} onSubmitCapture={formik.handleSubmit}>
      <Form.Item>
        <Input
          placeholder={placeholder}
          onPressEnter={() => formik.handleSubmit}
          name="search"
          onChange={formik.handleChange}
          value={formik.values.search}
          suffix={
            <button
              className="text-blueDark"
              onClick={() => formik.handleSubmit}
            >
              <SearchOutlined className="font-bold text-xl" />
            </button>
          }
          className="rounded-lg border-blueDark"
        />
      </Form.Item>
    </Form>
  );
}
