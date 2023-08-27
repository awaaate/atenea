import { Meta } from "@storybook/react";
import { ScrollArea } from "./scroll-area";

export default {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
};

export const Default = () => {
  return (
    <ScrollArea className="w-[200px] h-[200px] px-8">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king's pillow, in his soup,
      even in the royal toilet. The king was furious, but he couldn't seem to
      stop Jokester. And then, one day, the people of the kingdom discovered
      that the jokes left by Jokester were so funny that they couldn't help but
      laugh. And once they started laughing, they couldn't stop.
    </ScrollArea>
  );
};
