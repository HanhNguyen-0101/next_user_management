import { Form, Input } from "antd";
const { TextArea } = Input;

export const TextAreaFormField = ({
  formik,
  label,
  name,
  isRequired,
  ...props
}: any) => {
  return (
    <Form.Item
      style={{
        marginBottom: 12,
      }}
      label={
        <span>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </span>
      }
    >
      <TextArea
        name={name}
        onChange={formik.handleChange}
        onBlur={(e) => {
          formik.handleBlur(e);
          formik.setFieldValue(name, e.target.value.trim());
        }}
        value={formik.values[name]}
        className="rounded-sm"
        style={{ padding: 7 }}
        {...props}
      />
      {formik.errors[name] ? (
        <div className="text-red-500 text-xs">{formik.errors[name]}</div>
      ) : null}
    </Form.Item>
  );
};
