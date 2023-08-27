import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const classNames = "w-red w- rou";
const skeletonvariants = cva(
  "animate-pulse border-border-default bg-border-default w-full ",
  {
    variants: {
      type: {
        circle: "w-40 h-40 rounded-circle",
        rect: "w-40 h-40",
        text: "w-full h-4 rounded-pill",
      },
    },
    defaultVariants: {
      type: "rect",
    },
  }
);

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "circle" | "rect" | "text";
}
const Skeleton: React.FC<SkeletonProps> = ({
  className,
  type = "text",
  ...props
}) => {
  return <div className={skeletonvariants({ type, className })} {...props} />;
};
export type { SkeletonProps };
export { Skeleton };
