import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import {
  Phone,
  CreditCard,
  Calendar,
  Mail,
  DollarSign,
  User,
} from "lucide-react";
import { useRef } from "react";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Input label",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    helperText: {
      control: "text",
      description: "Helper text below the input",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take full width",
    },
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
      description: "Input size",
    },
    variant: {
      control: {
        type: "select",
        options: ["outlined", "filled"],
      },
      description: "Input variant style",
    },
    borderRadius: {
      control: {
        type: "select",
        options: ["none", "small", "medium", "large"],
      },
      description: "Input border radius",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the input is read-only",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    placeholder: {
      control: "text",
      description: "Input placeholder text",
    },
    mask: {
      control: "text",
      description: "Mask pattern for input formatting",
    },
    maskChar: {
      control: "text",
      description: "Character used for mask placeholders",
    },
    allowedChars: {
      control: "object",
      description: "RegExp to restrict input characters",
    },
    startAdornment: {
      control: "object",
      description: "Element to be placed at the start of the input",
    },
    endAdornment: {
      control: "object",
      description: "Element to be placed at the end of the input",
    },
    onChange: { action: "changed" },
    onInputChange: { action: "input changed" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    helperText: "We'll never share your email with anyone else.",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    error: "Password must be at least 8 characters long",
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    placeholder: "Small size",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    placeholder: "Large size",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "You cannot edit this",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read-only Input",
    value: "This is read-only content",
    readOnly: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "This input takes full width",
    fullWidth: true,
  },
};

// Yeni eklenen hikayeler

export const OutlinedVariant: Story = {
  args: {
    label: "Outlined Input",
    placeholder: "Default outlined style",
    variant: "outlined",
  },
};

export const FilledVariant: Story = {
  args: {
    label: "Filled Input",
    placeholder: "Filled style",
    variant: "filled",
  },
};

export const RoundedBorders: Story = {
  args: {
    label: "Rounded Input",
    placeholder: "Large border radius",
    borderRadius: "large",
  },
};

export const WithStartAdornment: Story = {
  args: {
    label: "User Input",
    placeholder: "Enter username",
    startAdornment: <User size={18} />,
  },
};

export const WithEndAdornment: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    endAdornment: <span style={{ fontSize: "12px", color: "#888" }}>Show</span>,
  },
};

export const WithMask: Story = {
  args: {
    label: "Phone Number",
    placeholder: "555-123-4567",
    mask: "___-___-____",
    maskChar: "_",
    helperText: "Format: 555-123-4567",
    startAdornment: <Phone size={18} />,
  },
};

export const PhoneNumberWithParentheses: Story = {
  args: {
    label: "Phone Number",
    placeholder: "(555) 123-4567",
    mask: "(___) ___-____",
    maskChar: "_",
    allowedChars: /[0-9]/,
    helperText: "Only numbers are allowed",
    startAdornment: <Phone size={18} />,
  },
};

export const CreditCardInput: Story = {
  args: {
    label: "Credit Card",
    placeholder: "1234 5678 9012 3456",
    mask: "____ ____ ____ ____",
    maskChar: "_",
    allowedChars: /[0-9]/,
    helperText: "Format: XXXX XXXX XXXX XXXX",
    startAdornment: <CreditCard size={18} />,
  },
};

export const DateInput: Story = {
  args: {
    label: "Date",
    placeholder: "MM/DD/YYYY",
    mask: "__/__/____",
    maskChar: "_",
    allowedChars: /[0-9]/,
    helperText: "Format: MM/DD/YYYY",
    startAdornment: <Calendar size={18} />,
  },
};

export const CurrencyInput: Story = {
  args: {
    label: "Amount",
    placeholder: "$0.00",
    allowedChars: /[0-9.]/,
    formatValue: (value) => {
      // Basit bir para formatı
      if (!value) return "";
      const numericValue = value.replace(/[^0-9.]/g, "");

      // Sayı formatı
      try {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(parseFloat(numericValue) || 0);
        return formatted;
      } catch {
        return `$${numericValue}`;
      }
    },
    startAdornment: <DollarSign size={18} />,
    helperText: "Enter an amount",
  },
};

export const EmailValidation: Story = {
  args: {
    label: "Email",
    placeholder: "example@domain.com",
    error: "Please enter a valid email address",
    startAdornment: <Mail size={18} />,
    onChange: (e) => {
      // Bu örnek gösterim amaçlıdır
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(e.target.value);
      console.log(`Email is valid: ${isValid}`);
    },
  },
};

// ForwardRef kullanımını göstermek için render fonksiyonu ile bir hikaye
export const WithRef = {
  render: (args: Story) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
      inputRef.current?.focus();
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Input {...args} ref={inputRef} />
        <button onClick={focusInput}>Focus Input</button>
      </div>
    );
  },
  args: {
    label: "Input with Ref",
    placeholder: "Click button to focus",
  },
};
