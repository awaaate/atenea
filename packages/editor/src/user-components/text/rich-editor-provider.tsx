import React from "react";
import { ComponentWithRichEditor } from "../../hooks/rich-text/use-rich-editor";
import { useNode } from "../../engine/nodes";

interface RichEditorProviderProps {
  Comp: React.ComponentType<any>;
}

const RichEditorProvider: React.FC<RichEditorProviderProps> = ({ Comp }) => {
  const richEditor = useNode((node) => node.data.props.richEditor);

  if (!richEditor) return null;

  return <Comp richEditor={richEditor} />;
};

export default RichEditorProvider;
