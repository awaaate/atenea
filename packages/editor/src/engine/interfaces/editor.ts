
<<<<<<< HEAD
import ReactGridLayout from 'react-grid-layout';
=======
>>>>>>> ebc5858 (performance)
import { Placement } from './events';
import { NodeEventTypes, NodeId, Nodes } from './nodes';

import { Node } from './nodes';
<<<<<<< HEAD

=======
>>>>>>> ebc5858 (performance)
export type Options = {
    onRender: React.ComponentType<{ render: React.ReactElement }>;
    resolver: Resolver;
    enabled: boolean;

};

export type Resolver = Record<string, string | React.ElementType>;

export interface Indicator {
    placement: Placement;
    error: string | null;
}

export type EditorEvents = Record<NodeEventTypes, Set<NodeId>>;

export type EditorState = {
    nodes: Nodes;
    events: EditorEvents;
    options: Options;
    actions: {
        setProp: (id: NodeId, cb: (node: Node) => Node) => void
<<<<<<< HEAD
        select: (id: NodeId, value?: boolean) => void
        hover: (id: NodeId, value?: boolean) => void
        drag: (id: NodeId) => void
        create: (node: Node) => void
        remove: (id: NodeId) => void

    },
    setLayout: (layout: ReactGridLayout.Layout[]) => void;
=======
        select: (id: NodeId) => void
        hover: (id: NodeId) => void
        drag: (id: NodeId) => void
    },
>>>>>>> ebc5858 (performance)
};
