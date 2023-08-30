import { useField } from "formik";

export const Select = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={props.parentClassName || ""}>
      <label
        htmlFor={props.id || props.name}
        className={props.lableClassName || ""}
      >
        {label}
      </label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={`error ${props.errorClassName || ''}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};
