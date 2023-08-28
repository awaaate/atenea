import { useNode } from "@craftjs/core";
import React from "react";
import { ComponentWithRichEditor } from "../../hooks/rich-text/use-rich-editor";

interface RichEditorProviderProps {
  Comp: React.ComponentType<any>;
}

const RichEditorProvider: React.FC<RichEditorProviderProps> = ({ Comp }) => {
  const { richEditor } = useNode((node) => {
    const props = node.data.props as ComponentWithRichEditor;
    if (!props.richEditor)
      return {
        richEditor: undefined,
      };

    return {
      richEditor: props.richEditor,
    };
  });

  if (!richEditor) return null;

  return <Comp richEditor={richEditor} />;
};

export default RichEditorProvider;
