import { useToast } from "./use-toast";
import { Button } from "../button";
import { Meta, StoryObj } from "@storybook/react";
import { ToastProvider } from "./toast";
import { Toaster } from "./toaster";

const Component = ({ variant }: { variant: "default" | "destructive" }) => {
  const { toast } = useToast();
  console.log(toast);
  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          variant,
        });
      }}
    >
      Show Toast
    </Button>
  );
};

const meta: Meta<typeof Component> = {
  title: "Components/Toast",
  parameters: {
    layout: "centered",
  },
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => {
    return (
      <div>
        <Component {...args} />
        <Toaster />
      </div>
    );
  },
};
