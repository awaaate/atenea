import { ToggleGroup, ToggleItem } from "@shared/ui/src/toggle-group";
import { WidgetConfigSection } from "../../widget/widget-config-section";

import { BackgroundPickerTabs } from "@shared/ui/src/background-picker";
import { Icon } from "@shared/ui/src/icon";
import { Separator } from "@shared/ui/src/separator";
import { cn } from "@shared/ui/src/utils";
import { Form, FormControl, FormLabel, useForm } from "@shared/ui/src/form";
import { useEditorStore } from "../../engine/editor";
import { Input } from "@shared/ui/src/input";
import { Textarea } from "@shared/ui/src/textarea";

const classes = {
  ToggleItem:
    "flex flex-col py-4  h-min items-center justify-center flex-1 data-[state=on]:bg-active-default  data-[state=on]:border-accent",
  toggleItemText: "text-sm text-text-weaker",
};
export const PageStylePannel = () => {
  const background = useEditorStore.use.pageBackground();
  const setBackground = useEditorStore.use.setPageBackground();
  const coverImageEnabled = useEditorStore.use.coverImageEnabled();
  const title = useEditorStore.use.title();
  const setTitle = useEditorStore.use.setTitle();
  const description = useEditorStore.use.description();
  const setDescription = useEditorStore.use.setDescription();

  return (
    <div className="flex flex-col gap-2">
      <WidgetConfigSection title="Title" className="mb-0">
        <WidgetConfigSection.Title />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My board"
        />
      </WidgetConfigSection>
      <Separator />
      <WidgetConfigSection title="Description" className="mt-0">
        <WidgetConfigSection.Title />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="My board"
        />
      </WidgetConfigSection>
      <Separator />
      <WidgetConfigSection title="Cover Image">
        <WidgetConfigSection.Title />
        <ToggleGroup
          type="single"
          className="flex gap-2"
          value={coverImageEnabled ? "true" : "false"}
          onValueChange={(value) => {
            useEditorStore.setState({ coverImageEnabled: value === "true" });
          }}
        >
          <ToggleItem value="false" className={cn(classes.ToggleItem)}>
            <Icon name="Layout" className="mb-1" />
            <span className="text-sm text-text-weaker">No cover</span>
          </ToggleItem>
          <ToggleItem value="true" className={cn(classes.ToggleItem)}>
            <Icon name="Layout" className="mb-1" />
            <span className="text-sm text-text-weaker">Cover Image</span>
          </ToggleItem>
        </ToggleGroup>
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
