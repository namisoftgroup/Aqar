import { Form } from "react-bootstrap";

export default function InputField({ label, hint, icon, img, ...props }) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={props.id}>
          {icon} {img && <img src={img} alt="img" />} {label}
          {hint && <span>({hint})</span>}
        </label>
      )}
      <Form.Control {...props} />
    </div>
  );
}
