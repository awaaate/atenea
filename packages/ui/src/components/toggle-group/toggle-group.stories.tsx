import { ToogleItem, ToogleGroup } from "./toggle-group";
export default {
  title: "Components/Toggle group",
};

const Template = (args: any) => {
  return (
    <ToogleGroup type="multiple" className="flex gap-2">
      <ToogleItem value="xs">xs</ToogleItem>
      <ToogleItem value="md">md</ToogleItem>
      <ToogleItem value="lg">lg</ToogleItem>
    </ToogleGroup>
  );
};

export const Default = Template.bind({});
