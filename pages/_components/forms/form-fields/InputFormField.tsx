import { Form, Input } from "antd";

export const InputFormField = ({ formik, label, name, isRequired, ...props }: any) => {
  return (
    <Form.Item
      style={{
        marginBottom: 12
      }}
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
        className="rounded-sm"
        style={{padding: 7}}
        {...props}
      />}
      {!props.type && <Input
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        className="rounded-sm"
        style={{padding: 7}}
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
