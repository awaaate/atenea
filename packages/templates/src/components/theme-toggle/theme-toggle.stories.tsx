
import { Meta, StoryFn } from "@storybook/react";
import { ThemeToggle } from "./theme-toggle";
export default {
    title: "Components/Theme Toggle",
    component: ThemeToggle,
    parameters: {
        layout: "centered",
    },


} satisfies Meta<typeof ThemeToggle>;


export const Default: StoryFn = () => {

    return (
        <ThemeToggle
        />
    );
}


