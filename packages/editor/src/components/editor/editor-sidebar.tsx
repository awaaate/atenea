import {
  BackgroundPicker,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/ui";
import React, { useEffect, useMemo } from "react";
import { selectors, useEditorStore } from "../../engine/editor";
import { WidgetConfigSection } from "../../widget/widget-config-section";
import PageStylePannel from "./page-style-pannel";

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

  /*   useEffect(() => {
    if (element) {
      setSidebar("node");
    }
  }, [element]); */

  console.log("related", related, sidebar);
  if (sidebar === null) return null;
  return (
    <div className="w-full max-w-[250px] border-l h-full">
      <Tabs value={sidebar} onValueChange={setSidebar as any}>
        <div className="w-full h-[50px] flex items-center border-b  px-4">
          {sidebar === "node"
            ? currentNode && (
                <span className="flex items-center font-semibold text-text-weaker">
                  <Icon name="BarChart" className="mr-2" />
                  {currentNode.data.props.title || "Widget"}
                </span>
              )
            : "Setttings"}
        </div>
        <TabsContent value="node">{element}</TabsContent>
        <TabsContent value="page">
          <PageStylePannel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { EditorSidebar };
