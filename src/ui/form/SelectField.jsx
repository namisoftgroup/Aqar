export default function SelectField({ options, hiddenOption, props }) {
  return (
    <select className="form-select" {...props}>
      <option disabled value={hiddenOption?.value}>
        {hiddenOption?.label}
      </option>
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
