import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

// Simple icon components for demo
const IconLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
  </svg>
);

const IconRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

const IconStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
  </svg>
);

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary", "outlined", "text"],
      },
      description: "Button appearance variant",
    },
    size: {
      control: { type: "select", options: ["small", "medium", "large"] },
      description: "Button size",
    },
    shadow: {
      control: { type: "select", options: ["none", "sm", "md", "lg"] },
      description: "Button shadow effect",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width button",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    icon: {
      control: { disable: true },
      description: "Icon element to be displayed in the button",
    },
    iconPosition: {
      control: { type: "select", options: ["left", "right"] },
      description: "Position of the icon relative to the button text",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    size: "medium",
    shadow: "none",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
};

export const WithShadow: Story = {
  args: {
    shadow: "lg",
    children: "Button with Shadow",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: "Back",
    icon: <IconLeft />,
    iconPosition: "left",
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Next",
    icon: <IconRight />,
    iconPosition: "right",
  },
};

export const IconOnly: Story = {
  args: {
    icon: <IconStar />,
    children: "",
    "aria-label": "Favorite",
    size: "medium",
    variant: "primary",
  },
};
