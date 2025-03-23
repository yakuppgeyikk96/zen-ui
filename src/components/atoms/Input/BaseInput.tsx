import { forwardRef, useId, useState } from "react";
import "./Input.scss";
import { InputBorderRadius, InputSize, InputType, InputVariant } from "./types";

export interface BaseInputProps {
  id?: string;
  label?: string;
  error?: string | string[];
  helperText?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  inputContainerClassName?: string;
  inputContainerStyle?: React.CSSProperties;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  size?: InputSize;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: InputVariant;
  borderRadius?: InputBorderRadius;
  type?: Partial<InputType>;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      fullWidth,
      placeholder,
      value,
      defaultValue,
      inputContainerClassName = "",
      inputClassName = "",
      inputContainerStyle,
      inputStyle,
      size = "medium",
      variant = "outlined",
      readOnly,
      disabled,
      startAdornment,
      endAdornment,
      min,
      max,
      step,
      onChange,
      onInputChange,
      onFocus,
      onBlur,
      borderRadius = "small",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      defaultValue || value || ""
    );

    const inputId = useId();

    const inputContainerClass = `ui-input-container ${inputContainerClassName} ${
      fullWidth ? "ui-input-container--full-width" : ""
    } ${size && !fullWidth ? `ui-input-container--${size}` : ""}`;

    const inputClass = `ui-input ${error ? "ui-input--error" : ""} ${
      fullWidth ? "ui-input--full-width" : ""
    } ${size ? `ui-input--${size}` : ""} ${
      readOnly ? "ui-input--readonly" : ""
    } ${disabled ? "ui-input--disabled" : ""} ${inputClassName} ${
      variant ? `ui-input--${variant}` : ""
    } ${borderRadius ? `ui-input--border-radius-${borderRadius}` : ""}`;

    const ariaDescribedby = error
      ? `${inputId}-error`
      : helperText
      ? `${inputId}-helper`
      : undefined;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      setInternalValue(inputValue);

      if (onChange) {
        onChange(event);
      }

      if (onInputChange) {
        onInputChange(inputValue);
      }
    };

    return (
      <div className={inputContainerClass} style={inputContainerStyle}>
        {label && <label htmlFor={id || inputId}>{label}</label>}
        <div className={inputClass}>
          {startAdornment && (
            <div className="ui-input__start-adornment">{startAdornment}</div>
          )}
          <input
            ref={ref}
            {...props}
            id={id || inputId}
            readOnly={readOnly}
            disabled={disabled}
            style={inputStyle}
            placeholder={placeholder}
            value={internalValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-invalid={Boolean(error)}
            aria-describedby={ariaDescribedby}
            min={min}
            max={max}
            step={step}
          />
          {endAdornment && (
            <div className="ui-input__end-adornment">{endAdornment}</div>
          )}
        </div>
        {Array.isArray(error)
          ? error.map((err, index) => (
              <p
                key={index}
                id={`${id}-error-message-${index}`}
                className="ui-input__error-message"
              >
                {err}
              </p>
            ))
          : error && (
              <p id={`${id}-error-message`} className="ui-input__error-message">
                {error}
              </p>
            )}
        {helperText && (
          <p id={`${id}-helper-text`} className="ui-input__helper-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export default BaseInput;
export type { InputSize, InputVariant, InputBorderRadius };
