import { Form } from "react-bootstrap";

export default function SelectField({
  label,
  hint,
  options,
  hiddenOption,
  loading,
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
          <option value={hiddenOption.value}>{hiddenOption.label}</option>
        )}
        {!loading ? (
          options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        ) : (
          <i className="fa-solid fa-spinner fa-spin"></i>
        )}
      </Form.Select>
    </div>
  );
}
