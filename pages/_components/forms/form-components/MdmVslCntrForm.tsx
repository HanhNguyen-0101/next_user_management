import { Form } from "antd";
import { useFormik } from "formik";
import { DatePickerFormField, InputFormField } from "../form-fields";
import { useEffect } from "react";
import { MdmVslCntrAction } from "@/redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IMdmVslCntrModel } from "@/redux/models/mdmVslCntr";
import * as Yup from "yup";
import { typeField } from "pages/_templates/MdmVslCntrSteps.template";
import { useTranslation } from "react-i18next";

const GenerateField = ({ data, formik }: any) => {
  const handleChangeDatePicker = (name: string) => {
    return (value: string) => {
      formik.setFieldValue(name, value);
    };
  };
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
                {field.type === typeField.DATE ? (
                  <DatePickerFormField
                    formik={formik}
                    isRequired={field.required}
                    onChange={handleChangeDatePicker(field.name)}
                    label={
                      <span className="capitalize font-medium opacity-80">
                        {field.title}
                      </span>
                    }
                    name={field.name}
                  />
                ) : (
                  <InputFormField
                    formik={formik}
                    isRequired={field.required}
                    label={
                      <span className="capitalize font-medium opacity-80">
                        {field.title}
                      </span>
                    }
                    name={field.name}
                  />
                )}
              </div>
            );
          })}
        </section>
      </section>
    );
  });
};
export default function MdmVslCntrForm({ source }: any) {
  const {
    mdmVslCntr,
    currentStep,
  }: { mdmVslCntr: IMdmVslCntrModel; currentStep: number } = useSelector(
    (state: any) => state.mdmVslCntrReducer
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(["common"]);

  const initialValues = {};
  const validationSchema = {};
  source?.map((item: any) => {
    item?.children?.map((i: any) => {
      if (mdmVslCntr && mdmVslCntr.id) {
        initialValues[i.name] = mdmVslCntr[i.name];
      }
      if (i.required) {
        validationSchema[i.name] = Yup.mixed().required(t("error.required"));
      }
    });
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      await dispatch(MdmVslCntrAction.setNextStepData(values));
      if (currentStep === 7) {
        if (mdmVslCntr && mdmVslCntr.id) {
          await dispatch(
            MdmVslCntrAction.editItem({
              id: mdmVslCntr.id,
              data: mdmVslCntr,
            })
          );
        } else {
          await dispatch(MdmVslCntrAction.addItem(mdmVslCntr));
        }
      }
    },
  });

  useEffect(() => {
    dispatch(MdmVslCntrAction.setCallbackNextStep(formik.handleSubmit));
  }, []);

  return (
    <Form
      layout="vertical"
      colon={false}
      className="ml-4 mr-7"
      onSubmitCapture={formik.handleSubmit}
    >
      <GenerateField data={source} formik={formik} />
    </Form>
  );
}
