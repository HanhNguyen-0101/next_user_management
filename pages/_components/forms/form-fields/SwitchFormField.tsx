import { Input, Form, Switch } from "antd";

export const SwitchFormField = ({ formik, label, name, ...props }: any) => {
  return (
    <Form.Item
      className="mb-3"
      label={
        <span>
          {label}
        </span>
      }
    >
      <Switch name={name} checked={formik.values[name]} {...props} />
      {formik.errors[name] ? (
        <div className="text-red-500 text-xs">{formik.errors[name]}</div>
      ) : null}
    </Form.Item>
  );
};
