import { forwardRef, useId, useState } from "react";
import { RadioSpecificProps } from "./types";

import "./Radio.scss";

const Radio = forwardRef<HTMLInputElement, RadioSpecificProps>(
  (
    {
      id,
      label,
      name,
      error,
      helperText,
      defaultChecked,
      checked,
      value,
      disabled,
      readOnly,
      size = "medium",
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
        onInputChange(event.target.name, event.target.checked);
      }
    };

    const radioClass = `ui-radio ${size ? `ui-radio--${size}` : ""} ${
      disabled ? "ui-radio--disabled" : ""
    } ${isChecked ? "ui-radio--checked" : ""} ${
      error ? "ui-radio--error" : ""
    }`;

    return (
      <div className="ui-radio-container">
        <label className="ui-radio-label">
          <div className={radioClass}>
            <input
              id={id || generatedId}
              ref={ref}
              name={name}
              value={value}
              checked={checked !== undefined ? checked : isChecked}
              disabled={disabled}
              onChange={handleChange}
              aria-invalid={!!error}
              {...props}
            />
            <span className="ui-radio-checkmark"></span>
          </div>
          {label && <span className="ui-radio-text">{label}</span>}
        </label>

        {error && Array.isArray(error) && (
          <p className="ui-radio__error-message">
            {error.map((err) => (
              <span key={err}>{err}</span>
            ))}
          </p>
        )}

        {helperText && <p className="ui-radio__helper-text">{helperText}</p>}
      </div>
    );
  }
);

export default Radio;
