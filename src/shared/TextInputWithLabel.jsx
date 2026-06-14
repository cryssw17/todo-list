import { forwardRef } from "react";
import styles from "./TextInputWithLabel.module.css";

function TextInputWithLabel(
  { elementId, onChange, labelText, value, type = "text", required = false },
  ref,
) {
  return (
    <div className={styles.textInput}>
      <label className={styles.label} htmlFor={elementId}>
        {labelText}
      </label>
      <input
        className={styles.input}
        type={type}
        id={elementId}
        ref={ref}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
}

export default forwardRef(TextInputWithLabel);
