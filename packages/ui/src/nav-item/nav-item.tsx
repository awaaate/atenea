import { ReactNode } from "react";
import { cn } from "../lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import { Icon, IconName } from "../icon";

type NavItemBase = {
  id: string;
  active?: boolean;
  children: ReactNode;
  icon?: IconName;
  badge?: ReactNode;
  className?: string;
};
type NavItemProps =
  | (NavItemBase & {
      href: string;
    })
  | (NavItemBase & {
      subnav: NavItemProps[];
    });

export const navItemClasse =
  "flex items-center hover:bg-nav-hover transition-colors py-2 px-3 rounded-default w-full text-sm font-medium text-text-weak";
const NavItem = ({
  className,
  icon,
  active = false,
  ...props
}: NavItemProps) => {
  const navItemClasses = cn(
    "flex items-center hover:bg-nav-hover transition-colors py-2 px-3 rounded-default w-full text-sm font-medium text-text-weak",
    { "bg-surface-lowered": active },
    className
  );
  let children: ReactNode = props.children;

  const IconComp = icon && (
    <Icon
      name={icon}
      size="m"
      className={cn("mr-2", {
        "": active,
      })}
    />
  );
  if ("subnav" in props) {
    return (
      <Collapsible defaultOpen>
        <CollapsibleTrigger
          className={cn(
            navItemClasses,
            "[&[data-state=open]>svg.collapse-icon]:rotate-180"
          )}
        >
          {IconComp}
          {children}
          <Icon
            name="ChevronDown"
            className={cn(
              "ml-auto transition-transform transion-quickly transform collapse-icon"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-md flex flex-col">
          {props.subnav.map((item) => (
            <NavItem {...item} className="font-xs py-1.5" />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <a href={props.href} className={navItemClasses}>
      {IconComp}
      {children}
    </a>
  );
};

export { NavItem };

export type { NavItemProps };
