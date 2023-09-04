import { Decorator } from "@storybook/react";
import { useEffect } from "react";
import { create } from "zustand";

import { cn } from "@shared/ui/src/utils";

export const useTheme = create<{
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
}>((set) => ({
  theme: "light",
  setTheme: (value: "light" | "dark") =>
    set((state) => {
      if (value === "dark") {
        document.querySelector("html")?.classList.add("dark");
        document.querySelector("html")?.classList.remove("light");
        return {
          ...state,
          theme: value,
        };
      }
      document.querySelector("html")?.classList.remove("dark");

      return {
        ...state,
        theme: value,
      };
    }),
}));

export const withTheme: Decorator = (StoryFn, context) => {
  const theme = (context.parameters.theme || context.globals.theme) as
    | "light"
    | "dark";

  //check if layout is set to fullscreen
  const isFullscreen = context.parameters.layout === "fullscreen";

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return (
    <div className={cn("bg-background-default")}>
      <StoryFn />
    </div>
  );
};
