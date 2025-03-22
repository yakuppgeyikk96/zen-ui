import { forwardRef, useId, useState } from "react";

import "./Input.scss";

type InputSize = "small" | "medium" | "large";

type InputVariant = "outlined" | "filled";

type InputBorderRadius = "none" | "small" | "medium" | "large";

const SPECIAL_CHARACTERS = [
  ".",
  "*",
  "+",
  "?",
  "^",
  "$",
  "{",
  "}",
  "(",
  ")",
  "|",
  "[",
  "]",
  "\\",
];

interface InputProps {
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
  mask?: string;
  maskChar?: string;
  allowedChars?: RegExp;
  formatValue?: (value: string) => string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
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
      inputContainerClassName,
      inputClassName,
      inputContainerStyle,
      inputStyle,
      size = "medium",
      variant = "outlined",
      readOnly,
      disabled,
      startAdornment,
      endAdornment,
      mask,
      maskChar,
      allowedChars,
      formatValue,
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

    const applyMask = (cleanValue: string): string => {
      let maskedValue = "";
      let valueIndex = 0;

      for (let i = 0; i < mask!.length && valueIndex < cleanValue.length; i++) {
        if (mask![i] === maskChar) {
          maskedValue += cleanValue[valueIndex++];
        } else {
          maskedValue += mask![i];
        }
      }

      return maskedValue;
    };

    const checkAllowedChars = (value: string) => {
      if (allowedChars) {
        const allowedCharsRegex = new RegExp(`${allowedChars.source}`, "g");

        return allowedCharsRegex.test(value);
      }

      return true;
    };

    const cleanInputValue = (value: string): string => {
      if (!mask || !maskChar) return value;

      const specialChars = mask.split("").filter((char) => char !== maskChar);
      const escapedChars = specialChars
        .map((char) => (SPECIAL_CHARACTERS.includes(char) ? `\\${char}` : char))
        .join("");

      return escapedChars.length > 0
        ? value.replace(new RegExp(`[${escapedChars}]`, "g"), "")
        : value;
    };

    const updateValue = (
      rawValue: string,
      maskedValue: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      let finalValue = maskedValue;

      if (formatValue) {
        finalValue = formatValue(maskedValue);
      }

      setInternalValue(finalValue);

      if (onChange) {
        const syntheticEvent = {
          ...event,
          target: {
            ...event.target,
            value: maskedValue,
          },
        };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }

      if (onInputChange) {
        onInputChange(rawValue);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      if (mask && maskChar) {
        const cleanValue = cleanInputValue(inputValue);

        if (
          inputValue.length > internalValue.length &&
          !checkAllowedChars(cleanValue)
        ) {
          return;
        }

        const maskedValue = applyMask(cleanValue);
        updateValue(cleanValue, maskedValue, event);
      } else {
        let finalValue = inputValue;

        if (formatValue && finalValue) {
          finalValue = formatValue(inputValue);
        }

        setInternalValue(finalValue);

        if (onChange) {
          const syntheticEvent = {
            ...event,
            target: {
              ...event.target,
              value: finalValue,
            },
          };
          onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
        }

        if (onInputChange) {
          onInputChange(inputValue);
        }
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

export default Input;
