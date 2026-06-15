import { forwardRef } from "react";
import styles from "./TextInputWithLabel.module.css";

function TextInputWithLabel(
  {
    elementId,
    onChange,
    labelText,
    value,
    type = "text",
    required = false,
    placeholder,
  },
  ref,
) {
  return (
    <div className="formGroup">
      <label className="formLabel" htmlFor={elementId}>
        {labelText}
      </label>
      <input
        className="formInput"
        type={type}
        id={elementId}
        ref={ref}
        onChange={onChange}
        value={value}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export default forwardRef(TextInputWithLabel);
