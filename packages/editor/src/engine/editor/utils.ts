import { _debounce } from "../../lib/utils";
import { WIDGET_NAMES, getWidget } from "../../user-components";
import { EditorState, Nodes } from "../interfaces";
import { createNode } from "../nodes";
import { useEditorStore } from "./store";
import { trpc } from "../../lib/trpc";

export function serialize(state: EditorState) {
    return {
        ...state,
        nodes: Object.keys(state.nodes).reduce((acc, key) => {
            const node = state.nodes[key];

            acc[key] = {
                ...node,
                dom: null,
            };
            return acc;
        }, {} as Nodes),
        events: {
            selected: Array.from(state.events.selected),
            hovered: Array.from(state.events.hovered),
            dragged: Array.from(state.events.dragged),
        },
    };
}
export const saveState = () => {
    const data = serialize(useEditorStore.getState());

    //fetch("/api/save", { method: "POST", body: JSON.stringify(data) });
    console.log("SAVING DATA", data)
    trpc.boards.setDraft.mutate({
        id: data.boardId,
        name: data.title,
        background: data.pageBackground || "transparent",
        accentColor: "default",
        draft: {
            nodes: data.nodes,
        },
    }).then((res) => {
        console.log("DATA SAVED SUCCESSFULLY")
        console.log(res)
    });

}
export const debouncedSave = _debounce(saveState, 2000);
export function deserialize(prev: EditorState, currentState: EditorState) {

    useEditorStore.setState({
        lastDatabaseSync: "saving",
    });

    const merged = {
        ...currentState,
        ...prev,
        nodes: Object.keys(prev.nodes).reduce((acc, key) => {
            const node = prev.nodes[key];
            console.log(
                "node",
                "displayName" in node.data ? node.data.displayName : "null",
                WIDGET_NAMES
            );
            const newNode = createNode({
                data: {
                    ...node.data,
                    type:
                        getWidget(WIDGET_NAMES[node.data.displayName])?.component ||
                        "null",
                },
                id: node.id,
            });
            acc[newNode.id] = newNode;
            return acc;
        }, {} as Nodes),
        lastDatabaseSync: new Date().toString(),
        events: {
            selected: new Set(prev.events.selected),
            hovered: new Set(prev.events.hovered),
            dragged: new Set(prev.events.dragged),
        },
    };

    return merged;
}