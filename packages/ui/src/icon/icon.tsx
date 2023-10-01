import {
  type LucideProps,
  Star,
  Check,
  Ban,
  Trophy,
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
  Share,
  DotIcon,
  ExternalLink,
  Eye,
  Table,
  Clock,
  CalendarClock,
  ThumbsDown,
  Sparkle,
  Loader2,
  Play,
  ThumbsUp,
  DollarSign,
  Coins,
} from "lucide-react";
import React from "react";

import { cn } from "../lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const Icons = {
  DollarSign,
  Coins,
  Clock,
  Sparkle,
  Spinner: Loader2,
  ThumbsDown,
  ThumbsUp,
  CalendarClock,
  Play,
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
  Share,
  ExternalLink,
  Eye,
  DotIcon,
  Table,
  Ban,
  Star,
  Trophy,
  Check,
};

const IconNames = Object.keys(Icons) as (keyof typeof Icons)[];
type IconName = keyof typeof Icons;

const iconVariants = cva("inline-flex", {
  variants: {
    variant: {
      default: "text-text-icon",
      button:
        "ring rounded-default ring-transparent transition-colors text-text-weakest  hover:ring-blue-500 text-current hover:text-text-weaker cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
interface IconProps extends LucideProps, VariantProps<typeof iconVariants> {
  name: IconName;
  size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, variant, size = "m", ...props }, ref) => {
    const IconComp = Icons[name];

    if (!IconComp) throw new Error(`Icon ${name} not found`);

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
        className={cn(sizes[size], iconVariants({ variant }), className)}
        ref={ref}
      />
    );
  }
);
Icon.displayName = "Icon";
export { Icon, IconNames };
export type { IconProps, IconName };
