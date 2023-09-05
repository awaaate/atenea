import { useEffect } from "react";
import { useEditorStore } from "../engine/editor/store";
import { saveState } from "../engine/editor/utils";
import { useDebouncedCallback } from "use-debounce";

export function useAutoSave() {

    const debouncedSave = useDebouncedCallback(() => {
        saveState();
    }, 1000, {
    })
    useEffect(() => {
        if (process.env.NODE_ENV === "development") return;
        if (!useEditorStore.getState().editable) return;


        const unsubscribe = useEditorStore.subscribe((state, prevState) => {
            debouncedSave();
        });
        return () => {
            unsubscribe();
        };
    }, []);
}