import { useEffect, useState } from "react";
import { useEditorStore } from "../engine/editor/store";
import { saveState } from "../engine/editor/utils";
import { useDebouncedCallback } from "use-debounce";

export function useAutoSave() {
    const [lastSavedState, setLastSavedState] = useState(new Date())
    const debouncedSave = useDebouncedCallback(() => {
        saveState();
        setLastSavedState(new Date())
    }, 1000, {
    })
    useEffect(() => {
        const unsubscribe = useEditorStore.subscribe((state, prevState) => {

            if (!state.editable) return

            debouncedSave();

        });
        return () => {
            unsubscribe();
        };
    }, []);

    return lastSavedState;
}