import { Input, Form, Switch, Checkbox } from "antd";

export const CheckboxFormField = ({ formik, label, name, children, ...props }: any) => {
  return (
    <Form.Item
      label={label}
      style={{
        marginBottom: 0,
      }}
    >
      <Checkbox name={name} checked={formik.values[name]} {...props} >{children}</Checkbox>
      {formik.errors[name] ? (
        <div className="text-red-500 text-xs">{formik.errors[name]}</div>
      ) : null}
    </Form.Item>
  );
};
