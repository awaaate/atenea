import { useEditor } from "@craftjs/core";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  BackgroundPicker,
  BackgroundPickerTabs,
} from "@shared/ui";
import React, { useEffect, useMemo } from "react";
import { WidgetConfigSection } from "../../widget/widget-config-section";

//drag with useDragStore
interface EditorSidebarProps {
  setSidebar: (state: "widget" | "page" | null) => void;
  sidebarTab: "widget" | "page" | null;
  coverImage: string;
  setCoverImage: (coverImage: string) => void;
  background: string;
  setBackground: (background: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  setSidebar,
  sidebarTab,
  background,
  setBackground,
  coverImage,
  setCoverImage,
}) => {
  const { active, currentNode, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent("selected").first();

    console.log("currentlySelectedNodeId", currentlySelectedNodeId);
    return {
      active: currentlySelectedNodeId,
      currentNode:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId],
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });
  const hasToolbar = related && related.toolbar;

  const element = useMemo(() => {
    if (!hasToolbar) return null;
    return React.createElement(related.toolbar);
  }, [hasToolbar]);

  useEffect(() => {
    if (element) {
      setSidebar("widget");
    }
  }, [element]);
  if (sidebarTab === null) return null;
  return (
    <div className="w-full max-w-[300px] border-l h-full">
      <Tabs value={sidebarTab} onValueChange={setSidebar as any}>
        <TabsList>
          {element && <TabsTrigger value="widget">Styles</TabsTrigger>}
          <TabsTrigger value="page">Page Styles</TabsTrigger>
        </TabsList>
        <TabsContent value="widget">{element}</TabsContent>
        <TabsContent value="page">
          <WidgetConfigSection title="Background">
            <WidgetConfigSection.Title />
            <BackgroundPicker
              background={background}
              setBackground={setBackground}
            />
          </WidgetConfigSection>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { EditorSidebar };
