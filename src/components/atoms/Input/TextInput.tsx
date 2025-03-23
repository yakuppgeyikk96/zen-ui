import { forwardRef, useState } from "react";
import BaseInput from "./BaseInput";
import { TextInputSpecificProps } from "./types";

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

export type TextInputType = "text" | "email" | "password" | "url";

const TextInput = forwardRef<HTMLInputElement, TextInputSpecificProps>(
  (
    {
      type = "text",
      mask,
      maskChar,
      allowedChars,
      formatValue,
      onChange,
      onInputChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      props.defaultValue || props.value || ""
    );

    const applyMask = (cleanValue: string): string => {
      if (!mask || !maskChar) return cleanValue;

      let maskedValue = "";
      let valueIndex = 0;

      for (let i = 0; i < mask.length && valueIndex < cleanValue.length; i++) {
        if (mask[i] === maskChar) {
          maskedValue += cleanValue[valueIndex++];
        } else {
          maskedValue += mask[i];
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

      const specialChars = mask
        .split("")
        .filter((char: string) => char !== maskChar);
      const escapedChars = specialChars
        .map((char: string) =>
          SPECIAL_CHARACTERS.includes(char) ? `\\${char}` : char
        )
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
      <BaseInput
        {...props}
        ref={ref}
        type={type}
        value={internalValue}
        onChange={handleChange}
      />
    );
  }
);

export default TextInput;
