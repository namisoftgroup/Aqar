export default function TextareaField({ label, ...props }) {
  return (
    <div className="form-field">
      {label && <label htmlFor={props.id}>{label}</label>}
      <textarea id={props.id} {...props}></textarea>
    </div>
  );
}
