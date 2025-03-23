import { forwardRef } from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import Checkbox from "./Checkbox";
import {
  CheckboxSpecificProps,
  InputProps,
  NumberInputSpecificProps,
  RadioSpecificProps,
  TextInputSpecificProps,
} from "./types";
import Radio from "./Radio";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  if (props.type === "number") {
    console.log("NumberInput", props);
    return <NumberInput {...(props as NumberInputSpecificProps)} ref={ref} />;
  }

  if (props.type === "checkbox") {
    return <Checkbox {...(props as CheckboxSpecificProps)} ref={ref} />;
  }

  if (props.type === "radio") {
    return <Radio {...(props as RadioSpecificProps)} ref={ref} />;
  }

  return <TextInput {...(props as TextInputSpecificProps)} ref={ref} />;
});

Input.displayName = "Input";

export default Input;
