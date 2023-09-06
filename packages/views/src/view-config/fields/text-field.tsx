import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { WidgetConfigSection } from "@shared/editor/src/widget/widget-config-section";
import { WidgetProps } from "@shared/editor/src/widget/widget-types";

import { Input } from "@shared/ui/src/input";
import React, { FormEvent, useCallback, useEffect } from "react";
import { getProperty } from "../../lib/getProperties";

interface TextFieldProps {
  name: keyof WidgetProps;
}
const TextField: React.FC<TextFieldProps> = ({ name }) => {
  const value = useNode(
    (node) => getProperty(node.data.props, name as string) as string
  );
  const { setNode } = useNodeActions();

  return (
    <Input
      value={value}
      onChange={(event: FormEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setNode((node) => {
          node.data.props[name] = newValue;
          console.log("node updated", node);
          return node;
        });
      }}
      type="text"
    />
  );
};

export function createTextField({
  name,
  label,
}: {
  name: keyof WidgetProps;
  label?: string;
}) {
  return (
    <WidgetConfigSection key={name} title={label || (name as string)}>
      <WidgetConfigSection.Title />
      <TextField name={name} />
    </WidgetConfigSection>
  );
}
