import { Field, useField } from "formik";

export const InputField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <div className={`relative mb-2.5 ${props.parentclassname}`}>
      <label
        htmlFor={props.id || props.name}
        className={`leading-7 text-sm text-gray-600 ${props.lableclassname}`}
      >
        {label}
      </label>
      <Field {...field} {...props} className={`w-full bg-white rounded border border-gray-300 focus:border-blueDark focus:ring-2 focus:ring-indigo-50 text-base outline-none text-gray-700 py-0.5 px-2 leading-8 transition-colors duration-200 ease-in-out ${props.className}`} />
      {meta.touched && meta.error ? (
        <div className={`error ${props.errorclassname || ''}`}>{meta.error}</div>
      ) : null}
    </div>
  );
};
