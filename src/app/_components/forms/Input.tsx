import { useField } from "formik";

export const Input = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <div className={props.parentclassname || ""}>
      <label
        htmlFor={props.id || props.name}
        className={props.lableclassname || ""}
      >
        {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={`error ${props.errorclassname || ''}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};
