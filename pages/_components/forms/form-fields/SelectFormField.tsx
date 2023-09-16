import { Form, Select } from "antd";
const { Option } = Select;

export const SelectFormField = ({
  formik,
  label,
  name,
  children,
  options,
  required = false,
  ...props
}: any) => {
  return (
    <Form.Item
      label={
        <span>
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      }
    >
      <Select
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        showSearch={false}
        {...props}
      >
        {options?.map((item: { value: string | number; label: string }) => (
          <Option key={item.value} value={item.value}>
            <span className="font-medium text-xs">{item.label.toUpperCase()}</span>
          </Option>
        ))}
      </Select>
      {formik.errors[name] ? (
        <div className="text-red-500 text-xs">{formik.errors[name]}</div>
      ) : null}
    </Form.Item>
  );
};
