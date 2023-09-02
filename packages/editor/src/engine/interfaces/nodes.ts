import React from 'react';
import { Widget, WidgetProps } from '../../widget/widget-types';


export type UserComponentConfig<T> = {
  displayName: string;
  related: Partial<NodeRelated>;

  defaultProps: Partial<T>;
};

export type UserComponent<T = any> = React.ComponentType<T> & {
  node: UserComponentConfig<T>;
};

export type NodeId = string;
export type NodeEventTypes = 'selected' | 'dragged' | 'hovered';

export type Node = {
  id: NodeId;
  data: NodeData;
  events: Record<NodeEventTypes, boolean>;
  dom: HTMLElement | null;
  related: Record<string, React.ElementType>;
  _hydrationTimestamp: number;
};


export type NodeRelated = Record<string, React.ElementType>;

export type NodeData = {
  props: WidgetProps;
  type: string | React.ElementType;
  name: string;
  displayName: string;
  parent: NodeId | null;
  linkedNodes: Record<string, NodeId>;
  nodes: NodeId[];
  hidden: boolean;
};

export type FreshNode = {
  id?: NodeId;
  data: Partial<NodeData> & Required<Pick<NodeData, 'type'>>;
};

export type ReduceCompType =
  | string
  | {
    resolvedName: string;
  };

export type ReducedComp = {
  type: ReduceCompType;
  isCanvas: boolean;
  props: any;
};

export type SerializedNode = Omit<
  NodeData,
  'type' | 'subtype' | 'name' | 'event'
> &
  ReducedComp;

export type SerializedNodes = Record<NodeId, SerializedNode>;

// TODO: Deprecate in favor of SerializedNode
export type SerializedNodeData = SerializedNode;

export type Nodes = Record<NodeId, Node>;

/**
 * A NodeTree is an internal data structure for CRUD operations that involve
 * more than a single node.
 *
 * For example, when we drop a component we use a tree because we
 * need to drop more than a single component.
 */
export interface NodeTree {
  rootNodeId: NodeId;
  nodes: Nodes;
}

type NodeIdSelector = NodeId | NodeId[];
type NodeObjSelector = Node | Node[];

export enum NodeSelectorType {
  Any,
  Id,
  Obj,
}

export type NodeSelector<
  T extends NodeSelectorType = NodeSelectorType.Any
> = T extends NodeSelectorType.Id
  ? NodeIdSelector
  : T extends NodeSelectorType.Obj
  ? NodeObjSelector
  : NodeIdSelector | NodeObjSelector;

export type NodeSelectorWrapper = {
  node: Node;
  exists: boolean;
};