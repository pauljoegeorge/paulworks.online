import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm hover:opacity-90 hover:shadow-md hover:-translate-y-px active:translate-y-0 active:shadow-sm",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--ring)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-[var(--ring)]",
        ghost:
          "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
        destructive:
          "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:opacity-90",
        link: "text-[var(--primary)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm rounded-[var(--radius-md)]",
        sm: "h-7 px-3 text-xs rounded-[var(--radius-sm)]",
        lg: "h-10 px-6 text-sm rounded-[var(--radius-md)]",
        icon: "h-9 w-9 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
