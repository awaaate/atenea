import { Banner, type BannerProps } from "./banner";

export default {
  title: "Components/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

const Template = (args: BannerProps) => (
  <div className="flex gap-4 flex-col min-w-[600px]">
    <Banner {...args} />
    <Banner {...args} variant="danger" />
    <Banner {...args} variant="warning" />
    <Banner {...args} variant="success" />
  </div>
);

export const Default = {
  args: {
    title: "Banner Title",
    description: "Hello world",
  },
  render: (args: BannerProps) => <Template {...args} />,
};
