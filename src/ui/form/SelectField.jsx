import { Form } from "react-bootstrap";

export default function SelectField({
  label,
  hint,
  options,
  hiddenOption,
  ...props
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={props.id}>
          {label} {hint && <span>({hint})</span>}
        </label>
      )}
      <Form.Select {...props}>
        {hiddenOption && (
          <option value={hiddenOption.value} disabled>
            {hiddenOption.label}
          </option>
        )}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
