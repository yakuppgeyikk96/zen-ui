import { forwardRef, useId, useState } from "react";
import { CheckboxSpecificProps } from "./types";

import "./Checkbox.scss";

const Checkbox = forwardRef<HTMLInputElement, CheckboxSpecificProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      defaultChecked,
      checked,
      indeterminate,
      disabled,
      readOnly,
      size = "medium",
      inputClassName = "",
      onChange,
      onInputChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();

    const [isChecked, setIsChecked] = useState(
      defaultChecked || checked || false
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly) {
        event.preventDefault();
        return;
      }

      setIsChecked(event.target.checked);

      if (onChange) {
        onChange(event);
      }

      if (onInputChange) {
        onInputChange(event.target.checked);
      }
    };

    const setRef = (element: HTMLInputElement | null) => {
      if (element) {
        element.indeterminate = indeterminate || false;
      }

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const checkboxClass = `ui-checkbox ${size ? `ui-checkbox--${size}` : ""} ${
      disabled ? "ui-checkbox--disabled" : ""
    } ${isChecked ? "ui-checkbox--checked" : ""} ${
      indeterminate ? "ui-checkbox--indeterminate" : ""
    } ${error ? "ui-checkbox--error" : ""} ${inputClassName}`;

    return (
      <div className="ui-checkbox-container">
        <label className="ui-checkbox-label">
          <input
            id={id || generatedId}
            ref={setRef}
            checked={checked !== undefined ? checked : isChecked}
            disabled={disabled}
            onChange={handleChange}
            className={checkboxClass}
            aria-invalid={!!error}
            {...props}
          />
          {label && <span className="ui-checkbox-text">{label}</span>}
        </label>

        {error && <p className="ui-checkbox__error-message">{error}</p>}

        {helperText && <p className="ui-checkbox__helper-text">{helperText}</p>}
      </div>
    );
  }
);

export default Checkbox;
