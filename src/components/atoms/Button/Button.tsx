import React from "react";

import "./Button.scss";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "text";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShadow = "none" | "sm" | "md" | "lg";
export type IconPosition = "left" | "right";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  shadow?: ButtonShadow;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  iconClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  shadow = "none",
  children,
  className = "",
  icon,
  iconPosition = "left",
  iconClassName = "",
  ...props
}) => {
  const buttonClass = `ui-button ui-button--${variant} ui-button--${size} ui-button--shadow-${shadow} ${
    fullWidth ? "ui-button--full-width" : ""
  } ${
    icon ? "ui-button--with-icon ui-button--icon-" + iconPosition : ""
  } ${className}`;

  const iconClass = `ui-button__icon ${iconClassName}`;

  return (
    <button className={buttonClass} {...props}>
      {icon && iconPosition === "left" && (
        <span className={iconClass}>{icon}</span>
      )}
      <span className="ui-button__text">{children}</span>
      {icon && iconPosition === "right" && (
        <span className={iconClass}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
