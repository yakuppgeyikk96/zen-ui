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
      inputClassName = "",
      onChange,
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
    };

    const radioClass = `ui-radio ${size ? `ui-radio--${size}` : ""} ${
      disabled ? "ui-radio--disabled" : ""
    } ${isChecked ? "ui-radio--checked" : ""} ${
      error ? "ui-radio--error" : ""
    } ${inputClassName}`;

    return (
      <div className="ui-radio-container">
        <label className="ui-radio-label">
          <input
            id={id || generatedId}
            ref={ref}
            name={name}
            value={value}
            checked={checked !== undefined ? checked : isChecked}
            disabled={disabled}
            onChange={handleChange}
            className={radioClass}
            aria-invalid={!!error}
            {...props}
          />
          {label && <span className="ui-radio-text">{label}</span>}
        </label>

        {error && <p className="ui-radio__error-message">{error}</p>}

        {helperText && <p className="ui-radio__helper-text">{helperText}</p>}
      </div>
    );
  }
);

export default Radio;
