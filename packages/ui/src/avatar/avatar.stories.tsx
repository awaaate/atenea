import { FunctionComponent } from "react";
import { Avatar, AvatarProps } from "./avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const Base: FunctionComponent<AvatarProps> = ({ ...props }) => (
  <div className="flex gap-4 items-center">
    <Avatar {...props} size={"sm"} />
    <Avatar {...props} size="default" />
    <Avatar {...props} size="lg" />
  </div>
);

export const Default = {
  args: {
    name: "Tomas Tienda",

    src: "",
  },
  render: (args: AvatarProps) => <Base {...args} />,
};
