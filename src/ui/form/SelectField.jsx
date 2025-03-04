import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function SelectField({
  label,
  hint,
  options,
  hiddenOption,
  loading,
  ...props
}) {
  const { t } = useTranslation();
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={props.id}>
          {label} {hint && <span>({hint})</span>}
        </label>
      )}
      <Form.Select {...props} disabled={loading}>
        {loading ? (
          <option value="" disabled>
            <p>{t("loading")}</p>
          </option>
        ) : (
          hiddenOption && (
            <option value={hiddenOption.value}>{hiddenOption.label}</option>
          )
        )}
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
