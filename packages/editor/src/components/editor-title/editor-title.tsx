import { cn } from "@shared/ui/src/utils";
import { HTMLAttributes } from "react";
import { useEditorStore } from "../..";

const classes = {
  title: "text-5xl text-text font-semibold focus:outline-none mb-2",
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
      className={cn(
        "bg-transparent shadow-0 border-0 text-5xl text-text focus:outline-none mb-2",
        className
      )}
      placeholder="My board"
    />
  );
};
