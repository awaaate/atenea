import { Button, Input, cn } from "@shared/ui";
import { useNode } from "./engine/nodes/use-node";

import { UserComponent } from "./engine/interfaces";
import { selectors, useEditorStore } from "./engine/editor/store";
import { useEffect } from "react";
import { RenderNodeToElement } from "./engine/nodes/node-render";
import { NodeProvider } from "./engine/nodes/node-context";
import {
  ToogleGroup,
  ToogleItem,
} from "@shared/ui/src/components/toggle-group";
import { createNode } from "./engine/nodes/create-node";

export default {
  title: "Welcome",
};

export const Hello = () => {
  const nodes = useEditorStore((state) => state.nodes);

  const create = useEditorStore((state) => state.actions.create);
  useEffect(() => {
    if (Object.keys(nodes).length === 0) {
      const node = createNode({
        data: {
          type: TextNode,
          props: {
            text: "hello world",
            color: "red",
          },
        },
      });

      create(node);
    }
  }, [nodes]);

  console.log("nodes", nodes);
  return (
    <div>
      {Object.values(nodes).map((node) => {
        return (
          <NodeProvider id={node.id}>
            <RenderNodeToElement {...node.data.props} />
          </NodeProvider>
        );
      })}

      {/* Related nodes */}
      {Object.values(nodes).map((node) => {
        if (node.related.toolbar) {
          const Comp = node.related.toolbar;
          return <Comp />;
        }
      })}
    </div>
  );
};

const TextNode: UserComponent = () => {
  const {
    selected,
    hovered,
    connect,
    actions: { setProp, deleteNode },
  } = useNode((node) => ({
    displayName: node.data.displayName,
    selected: node.events.selected,
    hovered: node.events.hovered,
  }));

  console.log({
    selected,
    hovered,
  });
  return (
    <div
      className={cn("border-2 border-black", {
        "bg-red-200": hovered,
      })}
      ref={connect}
    >
      <TextInput />
    </div>
  );
};

const TextInput = () => {
  const {
    value,
    color,
    connect,
    actions: { setProp },
  } = useNode((node) => ({
    value: node.data.props.text,
    color: node.data.props.color,
  }));

  return (
    <Input
      style={{
        color,
      }}
      value={value}
      onChange={({ target }) => {
        setProp((node) => {
          node.data.props.text = target.value;
          return node;
        });
      }}
    />
  );
};

const ConfigText = () => {
  const {
    value,
    connect,
    actions: { setProp, deleteNode },
  } = useNode((node) => ({
    value: node.data.props.color,
  }));

  return (
    <div>
      <ToogleGroup
        type="single"
        value={value}
        onValueChange={(value) => {
          setProp((node) => {
            node.data.props.color = value;
            return node;
          });
        }}
      >
        <ToogleItem value="red">red</ToogleItem>
        <ToogleItem value="blue">blue</ToogleItem>
      </ToogleGroup>
      <Button onClick={() => deleteNode()}>delete</Button>
    </div>
  );
};

TextNode.node = {
  displayName: "Text",
  defaultProps: {
    text: "hello world",
    color: "red",
  },
  related: {
    toolbar: ConfigText,
  },
};
