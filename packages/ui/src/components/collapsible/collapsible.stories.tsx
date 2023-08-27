import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

export default {
  title: "Components/Collapsible",
  tags: ["autodocs"],
};

const Template = (args: any) => (
  <div>
    <Collapsible {...args}>
      <CollapsibleTrigger>Trigger</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
    <Collapsible {...args}>
      <CollapsibleTrigger>Trigger 2</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  </div>
);

export const Default = Template.bind({});
