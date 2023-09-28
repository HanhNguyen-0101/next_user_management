import { Form } from "antd";
import { useFormik } from "formik";
import { InputFormField } from "../form-fields";
import { useEffect } from "react";
import { MdmVslCntrAction } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const GenerateField = ({ data, formik }: any) => {
  return data?.map((item: any, index: number) => {
    return (
      <section key={index}>
        {item.title && (
          <h2 className="text-blueDark text-base title-font mb-4 tracking-wider capitalize border-b border-blueDark">
            {item.title}
          </h2>
        )}
        <section className="text-slate-50 body-font w-full mb-6 py-1 grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {item?.children?.map((field: any, idx: number) => {
            return (
              <div className={field.className} key={idx}>
                <InputFormField
                  formik={formik}
                  label={
                    <span className="capitalize font-medium opacity-80">
                      {field.title}
                    </span>
                  }
                  name={field.name}
                />
              </div>
            );
          })}
        </section>
      </section>
    );
  });
};
export default function MdmVslCntrForm({ source }: any) {
  const { mdmVslCntr } = useSelector((state: any) => state.mdmVslCntrReducer);
  const dispatch = useDispatch();

  const initialValues = {};
  source?.map((item: any) => {
    item?.children?.map((i: any) => {
      initialValues[i.name] = mdmVslCntr[i.name];
    });
  });
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log("values", values, source);
      dispatch(MdmVslCntrAction.setNextStepData(values))
    },
  });

  useEffect(() => {
    dispatch(MdmVslCntrAction.setCallbackNextStep(formik.handleSubmit));
  }, []);

  return (
    <Form
      layout="vertical"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
    >
      <GenerateField data={source} formik={formik} />
    </Form>
  );
}
