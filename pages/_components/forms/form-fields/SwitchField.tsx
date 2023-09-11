import { Space, Switch } from "antd";
import { useField } from "formik";

export const SwitchField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <div className={`relative mb-2.5 ${props.parentclassname}`}>
      <Space className="inline-flex justify-between">
        <label
          htmlFor={props.id || props.name}
          className={`leading-7 text-sm text-gray-600 ${props.lableclassname}`}
        >
          {label}
        </label>
        <Switch />
      </Space>
      {meta.touched && meta.error ? (
        <div className={`error ${props.errorclassname || ""}`}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
