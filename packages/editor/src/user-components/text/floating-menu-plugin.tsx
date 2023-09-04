"use client";

import { usePointerInteractions } from "@shared/ui/src/lib/hooks/usePointerInteractions";
import { computePosition } from "@shared/ui/src/lib/floating-ui";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useList } from "../../hooks/rich-text/use-list";
import { FloatingMenu, FloatingMenuCoords } from "./floating-menu";

export function FloatingMenuPlugin({
  richEditor,
}: {
  richEditor: LexicalEditor;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<FloatingMenuCoords>(undefined);

  const { isPointerDown, isPointerReleased } = usePointerInteractions();
  const calculatePosition = useCallback(() => {
    const domSelection = getSelection();
    const domRange =
      domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);

    if (!domRange || !ref.current || isPointerDown) return setCoords(undefined);

    computePosition(domRange, ref.current, { placement: "top" })
      .then((pos) => {
        setCoords({ x: pos.x, y: pos.y - 10 });
      })
      .catch(() => {
        setCoords(undefined);
      });
  }, [isPointerDown]);

  const $handleSelectionChange = useCallback(() => {
    const rootElement = richEditor.getRootElement();
    if (!rootElement) {
      setCoords(undefined);
      return;
    }
    /**
     * Maybe we should check if the root element is the active element
     * and if the active element is contained within the root element.
     *
     */
    if (richEditor.isComposing()) {
      setCoords(undefined);
      return;
    }

    const selection = $getSelection();

    if ($isRangeSelection(selection) && !selection.anchor.is(selection.focus)) {
      calculatePosition();
    } else {
      setCoords(undefined);
    }
  }, [richEditor, calculatePosition]);

  const show = coords !== undefined;

  useEffect(() => {
    if (isPointerReleased) {
      richEditor.getEditorState().read(() => $handleSelectionChange());
    }
    // Adding show to the dependency array causes an issue if
    // a range selection is dismissed by navigating via arrow keys.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPointerReleased, $handleSelectionChange, richEditor]);

  useList(richEditor);

  if (!typeof window) return null;

  return createPortal(
    <FloatingMenu ref={ref} editor={richEditor} coords={coords} />,
    document.body
  );
}
