import { cn } from "@shared/ui/src/utils";
import { HTMLAttributes } from "react";
import { useEditorStore } from "../..";

const classes = {
  title:
    "text-5xl text-text font-semibold focus:outline-none mb-2 w-full bg-surface-default p-2 text-center",
};
export const EditorTitle: React.FC<HTMLAttributes<HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => {
  const title = useEditorStore.use.title();
  const setTitle = useEditorStore.use.setTitle();
  const editable = useEditorStore.use.editable();
  const showTitle = editable || title;

  if (!showTitle) return null;

  if (!editable)
    return <h1 className={cn(classes.title, className)}>{title}</h1>;
  return (
    <input
      {...props}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      disabled={!editable}
      className={cn(classes.title)}
      placeholder="My board"
    />
  );
};
