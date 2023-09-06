"use client"
import { loadEditorState } from "@shared/editor";
import { EditorState } from "@shared/editor/src/engine/interfaces";
import { useRef } from "react";

export const BoardInitializer = (state: Partial<EditorState>) => {
    const intialized = useRef(false);

    if (!intialized.current) {
        loadEditorState({
            ...state,
            events: {
                selected: new Set(),
                dragged: new Set(),
                hovered: new Set(),
            },
        });
        intialized.current = true;
    }

    return null
}
