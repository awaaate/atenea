import React from "react";
import { WidgetConfigSection } from "../../widget/widget-config-section";
import {
  ToogleGroup,
  ToogleItem,
} from "@shared/ui/src/components/toggle-group";
import {
  BackgroundPicker,
  BackgroundPickerTabs,
  Icon,
  Separator,
  cn,
} from "@shared/ui";
import { useEditorStore } from "../../engine/editor";

const classes = {
  toogleItem:
    "flex flex-col py-4  h-min items-center justify-center flex-1 data-[state=on]:bg-active-default  data-[state=on]:border-accent",
  toggleItemText: "text-sm text-text-weaker",
};
const PageStylePannel = () => {
  const background = useEditorStore.use.pageBackground();
  const setBackground = useEditorStore.use.setPageBackground();

  const coverImageEnabled = useEditorStore.use.coverImageEnabled();

  return (
    <div className="flex flex-col gap-2">
      <WidgetConfigSection title="Cover Image">
        <WidgetConfigSection.Title />
        <ToogleGroup
          type="single"
          className="flex gap-2"
          value={coverImageEnabled ? "true" : "false"}
          onValueChange={(value) => {
            useEditorStore.setState({ coverImageEnabled: value === "true" });
          }}
        >
          <ToogleItem value="false" className={cn(classes.toogleItem)}>
            <Icon name="Layout" className="mb-1" />
            <span className="text-sm text-text-weaker">No cover</span>
          </ToogleItem>
          <ToogleItem value="true" className={cn(classes.toogleItem)}>
            <Icon name="Layout" className="mb-1" />
            <span className="text-sm text-text-weaker">Cover Image</span>
          </ToogleItem>
        </ToogleGroup>
      </WidgetConfigSection>
      <Separator />

      <WidgetConfigSection title="Background">
        <WidgetConfigSection.Title />
        <BackgroundPickerTabs
          background={background}
          setBackground={setBackground}
        />
      </WidgetConfigSection>
    </div>
  );
};

export default PageStylePannel;
