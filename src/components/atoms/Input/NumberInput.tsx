import { forwardRef } from "react";
import BaseInput from "./BaseInput";
import { NumberInputSpecificProps } from "./types";

const NumberInput = forwardRef<HTMLInputElement, NumberInputSpecificProps>(
  ({ min, max, step, onChange, onInputChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    return (
      <BaseInput
        {...props}
        ref={ref}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    );
  }
);

export default NumberInput;
