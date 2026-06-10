import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-gold text-black hover:bg-gold/90": variant === "primary",
            "bg-foreground/10 text-foreground hover:bg-foreground/15": variant === "secondary",
            "border border-gold text-gold hover:bg-gold hover:text-black":
              variant === "outline",
            "text-muted hover:text-gold": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm rounded-md": size === "sm",
            "px-6 py-3 text-sm rounded-lg": size === "md",
            "px-8 py-4 text-base rounded-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
