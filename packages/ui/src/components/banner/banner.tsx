import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Icon } from "../icon";

const bannerVariants = cva(
  "relative w-full rounded-default border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        info: "bg-status-info-weak border-status-info text-text-info",
        danger: "bg-status-danger-weak border-status-danger text-text-danger",
        warning:
          "bg-status-warning-weak border-status-warning text-text-warning",
        success:
          "bg-status-success-weak border-status-success text-text-success",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const className =
  "bg-status-info-weak text-status-success border-text-success rounded-default";
const BannerRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bannerVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="Banner"
    className={cn(bannerVariants({ variant }), className)}
    {...props}
  />
));
BannerRoot.displayName = "Banner";

type BannerProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof bannerVariants> & {
    title: React.ReactNode;
    description?: React.ReactNode;
  };

const Banner: React.FC<BannerProps> = ({
  title,
  description,
  className,
  variant,
  ...props
}) => {
  const BannerIcon = {
    info: <Icon name="Info" className="text-status-info" />,
    danger: <Icon name="AlertCircle" className="text-status-danger" />,
    warning: <Icon name="HelpCircle" className="text-status-warning" />,
    success: <Icon name="CheckCircle2" className="text-status-success" />,
  }[variant || "info"];
  return (
    <BannerRoot className={className} variant={variant} {...props}>
      {BannerIcon}
      <BannerTitle className="text-md font-semibold">{title}</BannerTitle>
      {description && (
        <BannerDescription className="text-sm">{description}</BannerDescription>
      )}
    </BannerRoot>
  );
};
Banner.displayName = "Banner";

const BannerTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("font-weight-default ", className)} {...props} />
));
BannerTitle.displayName = "BannerTitle";

const BannerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
BannerDescription.displayName = "BannerDescription";

export { Banner, BannerTitle, BannerRoot, BannerDescription };
export type { BannerProps };
