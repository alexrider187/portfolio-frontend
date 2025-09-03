// src/components/ui/Button.tsx
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className,
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2 rounded-xl font-medium transition-transform duration-200 active:scale-95";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    outline:
      "border border-neutral text-neutral-light hover:bg-neutral-dark hover:text-white",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? disabledStyles : "hover:scale-105"
      } ${className || ""}`}
    >
      {children}
    </button>
  );
}
