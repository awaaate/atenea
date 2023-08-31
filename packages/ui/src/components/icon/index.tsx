import {
  type LucideProps,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  AlertCircle,
  Info,
  CheckCircle2,
  HelpCircle,
  Search,
  Home,
  Settings,
  User,
  Users,
  Calendar,
  Bell,
  Mail,
  Layout,
  Plus,
  Settings2,
  FileText,
  Folder,
  LayoutDashboard,
  Grip,
  MoreVertical,
  MoreHorizontal,
  Copy,
  Trash2,
  Pencil,
  Undo2,
  Redo2,
  Maximize2,
  PieChart,
  ScatterChart,
  BarChart,
  AreaChart,
  Type,
  LogOut,
  Sun,
  Moon,
  Bold,
  Underline,
  List,
  ListOrdered,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Text,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  Code,
  Paintbrush2,
  Link2,
  BarChartHorizontal,
  Strikethrough,
  Wallet2,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import React from "react";

import { cn } from "../../lib/utils";

const Icons = {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  AlertCircle,
  Info,
  CheckCircle2,
  HelpCircle,
  Search,
  Home,
  Settings,
  User,
  Users,
  Calendar,
  Bell,
  Mail,
  Plus,
  Settings2,
  Layout,
  LayoutDashboard,
  FileText,
  Folder,
  Grip,
  MoreHorizontal,
  MoreVertical,
  Copy,
  Trash2,
  Pencil,
  Maximize2,
  Undo: Undo2,
  Redo: Redo2,
  PieChart,
  ScatterChart,
  BarChart,
  AreaChart,
  BarChartHorizontal,
  Type,
  LogOut,
  Sun,
  Moon,
  Bold,
  Underline,
  List,
  ListOrdered,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Text,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  Code,
  Paintbrush2,
  Link2,
  Strikethrough,
  Wallet2,
  PanelLeft,
  PanelLeftClose,
};

const IconNames = Object.keys(Icons) as (keyof typeof Icons)[];
type IconName = keyof typeof Icons;

interface IconProps extends LucideProps {
  name: IconName;
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = "m", ...props }, ref) => {
    const IconComp = Icons[name];

    const sizes = {
      xxs: "icon-xxs",
      xs: "icon-xs",
      s: "icon-s",
      m: "icon-m",
      l: "icon-l",
      xl: "icon-xl",
      xxl: "icon-xxl",
    };
    return (
      <IconComp
        {...props}
        className={cn("inline-block text-icon-default", sizes[size], className)}
        ref={ref}
      />
    );
  }
);

export { Icon, IconNames };
export type { IconProps, IconName };