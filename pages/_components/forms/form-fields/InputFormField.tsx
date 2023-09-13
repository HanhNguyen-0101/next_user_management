import { Input, Form } from "antd";

export const InputFormField = ({ formik, label, name, isRequired, ...props }: any) => {
  return (
    <Form.Item
      className="mb-3"
      label={
        <span>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </span>
      }
    >
      {props.type == 'password' && <Input.Password
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        className="p-1.5 rounded-sm"
        {...props}
      />}
      {!props.type && <Input
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        className="p-1.5 rounded-sm"
        {...props}
      />}
      {formik.errors[name] ? (
        <div className="text-red-500 text-xs">
          {formik.errors[name]}
        </div>
      ) : null}
    </Form.Item>
  );
};
