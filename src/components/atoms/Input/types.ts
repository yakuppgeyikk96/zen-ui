export type InputSize = "small" | "medium" | "large";
export type InputVariant = "outlined" | "filled";
export type InputBorderRadius = "none" | "small" | "medium" | "large";

export type InputCommonProps = {
  id?: string;
  label?: string;
  name?: string;
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
  variant?: InputVariant;
  borderRadius?: InputBorderRadius;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export type TextInputType = "text" | "email" | "password" | "url";

export type TextInputSpecificProps = InputCommonProps & {
  type?: TextInputType;
  mask?: string;
  maskChar?: string;
  allowedChars?: RegExp;
  formatValue?: (value: string) => string;
  onInputChange?: (value: string) => void;
};

export type NumberInputSpecificProps = InputCommonProps & {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
  thousandSeparator?: boolean;
  precision?: number;
  onInputChange?: (value: string) => void;
};

export type CheckboxSpecificProps = InputCommonProps & {
  type: "checkbox";
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onInputChange?: (value: boolean) => void;
};

export type RadioSpecificProps = InputCommonProps & {
  name: string;
  type: "radio";
  checked?: boolean;
  defaultChecked?: boolean;
  onInputChange?: (name: string, value: boolean) => void;
};

export type InputProps =
  | TextInputSpecificProps
  | NumberInputSpecificProps
  | CheckboxSpecificProps
  | RadioSpecificProps;
