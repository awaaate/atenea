import { Slider } from "./slider";
import { Meta } from "@storybook/react";

export default {
    title: "Components/Slider",
    component: Slider,
    tags:["autodocs"]
} satisfies Meta<typeof Slider>

export const DefaultStory = (args: any) => <Slider {...args} />;

