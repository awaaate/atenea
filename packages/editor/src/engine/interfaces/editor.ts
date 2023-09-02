
import { Placement } from './events';
import { NodeEventTypes, NodeId, Nodes } from './nodes';

import { Node } from './nodes';
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
    editable: boolean;
    boardId: string;
    sidebar: "node" | "page" | null;
    title: string;
    pageBackground: string;
    coverImage: string;
    nodes: Nodes;
    events: EditorEvents;
    options: Options;
    lastDatabaseSync: string,
    coverImageEnabled: boolean,
    connectNode: (id: NodeId, dom: HTMLElement | null) => void;
    setNode: (id: NodeId, cb: (node: Node) => Node) => void
    select: (id: NodeId, value?: boolean) => void
    unSelectAll: () => void
    hover: (id: NodeId, value?: boolean) => void
    drag: (id: NodeId) => void
    create: (node: Node) => void
    remove: (id: NodeId) => void
    setSidebar: (sidebar: "node" | "page" | null) => void
    setTitle: (title: string) => void
    setPageBackground: (pageBackground: string) => void
    setCoverImage: (coverImage: string) => void
    setLayout: (layout: ReactGridLayout.Layout[]) => void;
    merge: (state: Partial<EditorState>) => void;

};
