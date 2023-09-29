import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

export const DatePickerFormField = ({
  formik,
  label,
  name,
  children,
  isRequired,
  ...props
}: any) => {
  return (
    <Form.Item
      label={
        <span>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </span>
      }
      style={{
        marginBottom: 0,
      }}
      className="w-full"
    >
      <DatePicker
        name={name}
        style={{ width: "100%" }}
        onChange={formik.handleChange}
        value={formik.values[name] ? dayjs(formik.values[name]) : ''}
        {...props}
      />
      {formik.errors[name] ? (
        <div className="text-red-500 text-xs">{formik.errors[name]}</div>
      ) : null}
    </Form.Item>
  );
};
