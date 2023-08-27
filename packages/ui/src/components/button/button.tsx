import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const className = "border-hover";
const buttonVariants = cva(
  "items-center justify-center  shadow inline-flex font-weight-default rounded-s font text-m border-border-strong ring-offset-background transition-colors transition-transform transition-slowly focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:opacity-90 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-button-default hover:bg-button-hover border border-border-strong hover",
        primary: "bg-accent text-text-on-accent hover:bg-accent/90  ",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-black/20  shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
export const ButtonLeftElement = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Slot>
>(({ className, ...props }, ref) => (
  <Slot className={cn("mr-2", className)} ref={ref} {...props} />
));

export const ButtonRightElement = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Slot> & {
    children: React.ReactElement;
  }
>(({ className, children, ...props }, ref) => (
  <Slot className={cn("ml-2", className)} ref={ref} {...props}>
    {children}
  </Slot>
));

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
> & {
  LeftElement: typeof ButtonLeftElement;
  RightElement: typeof ButtonRightElement;
};

//@ts-expect-error
const Button: ButtonComponent = forwardRef(
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

Button.LeftElement = ButtonLeftElement;
Button.RightElement = ButtonRightElement;

ButtonLeftElement.displayName = "ButtonLeftElement";
ButtonRightElement.displayName = "ButtonRightElement";
Button.displayName = "Button";

export { Button, buttonVariants };
