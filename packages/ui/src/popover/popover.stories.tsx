import { Meta } from "@storybook/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"


export default {
    "title": "Components/Popover",
    component: Popover,
    tags:["autodocs"]
    
} satisfies Meta<typeof Popover>;


export const DefaultStory = (args: any) => (<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>)