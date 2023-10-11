import { ToggleItem, ToggleGroup } from "./toggle-group";
export default {
  title: "Components/Toggle group",
};

const Template = (args: any) => {
  return (
    <ToggleGroup type="multiple" className="flex gap-2">
      <ToggleItem value="xs">xs</ToggleItem>
      <ToggleItem value="md">md</ToggleItem>
      <ToggleItem value="lg">lg</ToggleItem>
    </ToggleGroup>
  );
};

export const Default = Template.bind({});
