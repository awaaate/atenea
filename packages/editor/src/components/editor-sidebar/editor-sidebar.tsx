import React, { useMemo } from "react";

import { Tabs, TabsContent } from "@shared/ui/src/tabs";
import { Icon } from "@shared/ui/src/icon";
import { selectors, useEditorStore } from "../../engine/editor";
import { PageStylePannel } from "./page-style-pannel";
import { CreateWidgetPannel } from "./create-widget-pannel";

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

  return (
    <div className="w-full max-w-[250px] border-l h-full">
      <Tabs value={sidebar || "page"} onValueChange={setSidebar as any}>
        <div className="w-full h-[50px] flex items-center border-b  px-4">
          {sidebar === "node" ? (
            currentNode && (
              <span className="flex items-center font-semibold text-text-weaker">
                <Icon name="BarChart" className="mr-2" />
                {currentNode.data.props.title || "Widget"}
              </span>
            )
          ) : sidebar === "page" ? (
            <span className="flex items-center font-semibold text-text-weaker">
              <Icon name="Layout" className="mr-2" />
              Page
            </span>
          ) : sidebar === "create" ? (
            <span className="flex items-center font-semibold text-text-weaker">
              <Icon name="Plus" className="mr-2" />
              Create Widget
            </span>
          ) : (
            "Sidebar"
          )}
        </div>
        <TabsContent value="node">{element}</TabsContent>
        <TabsContent value="page">
          <PageStylePannel />
        </TabsContent>
        <TabsContent value="create">
          <CreateWidgetPannel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { EditorSidebar };
