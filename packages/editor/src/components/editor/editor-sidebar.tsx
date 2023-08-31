import {
  BackgroundPicker,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/ui";
import React, { useEffect, useMemo } from "react";
import { selectors, useEditorStore } from "../../engine/editor";
import { WidgetConfigSection } from "../../widget/widget-config-section";

//drag with useDragStore
interface EditorSidebarProps {}

const EditorSidebar: React.FC<EditorSidebarProps> = () => {
  const sidebar = useEditorStore.use.sidebar();
  const background = useEditorStore.use.pageBackground();
  const setBackground = useEditorStore.use.setPageBackground();

  const setSidebar = useEditorStore.use.setSidebar();

  const { active, currentNode, related } = useEditorStore(selectors.toolbar);
  const hasToolbar = related && related.toolbar;

  const element = useMemo(() => {
    if (!hasToolbar) return null;
    return React.createElement(related.toolbar);
  }, [hasToolbar]);

  useEffect(() => {
    if (element) {
      setSidebar("node");
    }
  }, [element]);
  if (sidebar === null) return null;
  return (
    <div className="w-full max-w-[300px] border-l h-full">
      <Tabs value={sidebar} onValueChange={setSidebar as any}>
        <TabsList>
          {element && <TabsTrigger value="node">Styles</TabsTrigger>}
          <TabsTrigger value="page">Page Styles</TabsTrigger>
        </TabsList>
        <TabsContent value="node">{element}</TabsContent>
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
