import { useField } from "formik";

export const Select = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={props.parentclassname || ""}>
      <label
        htmlFor={props.id || props.name}
        className={props.lableclassname || ""}
      >
        {label}
      </label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={`error ${props.errorclassname || ''}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};
