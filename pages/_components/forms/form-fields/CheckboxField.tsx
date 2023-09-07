import { useField } from "formik";

export const CheckboxField = ({ children, ...props }: any) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className={` ${props.parentclassname}`}>
      <label className={`text-gray-500 ${props.lableclassname}`}>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={`error ${props.errorclassname || ''}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};
