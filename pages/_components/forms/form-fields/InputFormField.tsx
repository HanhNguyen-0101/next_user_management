import { Form, Input } from "antd";

export const InputFormField = ({ formik, label, name, isRequired, width, ...props }: any) => {
  return (
    <Form.Item
      style={{
        marginBottom: 12
      }}
      className={`${width ? `w-[${width}px]` : 'w-full'} inline-block`}
      label={
        <span>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </span>
      }
    >
      {props.type == 'password' && <Input.Password
        name={name}
        onChange={formik.handleChange}
        onBlur={(e) => {
          formik.handleBlur(e);
          formik.setFieldValue(name, e.target.value.trim());
        }}
        value={formik.values[name]}
        className="rounded-sm"
        style={{padding: 7}}
        {...props}
      />}
      {!props.type && <Input
        name={name}
        onChange={formik.handleChange}
        onBlur={(e) => {
          formik.handleBlur(e);
          formik.setFieldValue(name, e.target.value.trim());
        }}
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
