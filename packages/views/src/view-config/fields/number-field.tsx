import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { WidgetConfigSection } from "@shared/editor/src/widget/widget-config-section";
import { WidgetProps } from "@shared/editor/src/widget/widget-types";

import { Input } from "@shared/ui/src/input";
import React, { FormEvent, useCallback } from "react";

interface NumberFieldProps {
  name: keyof WidgetProps;
}
const NumberField: React.FC<NumberFieldProps> = ({ name }) => {
  const value = useNode((node) => node.data.props[name] as number);
  const { setNode } = useNodeActions();
  console.log("key inside", name);

  return (
    <Input
      value={value}
      onChange={(event: FormEvent<HTMLInputElement>) => {
        const newValue = Number(event.currentTarget.value);
        if (!isNaN(newValue)) {
          console.log("newValue", name);
          setNode((node) => {
            node.data.props[name] = newValue;
            console.log("node updated", node);
            return node;
          });
        }
      }}
      type="number"
    />
  );
};

export function createNumberField({
  name,
  label,
}: {
  name: keyof WidgetProps;
  label?: string;
}) {
  console.log("key", name);
  return (
    <WidgetConfigSection key={name} title={label || (name as string)}>
      <WidgetConfigSection.Title />
      <NumberField name={name} />
    </WidgetConfigSection>
  );
}
