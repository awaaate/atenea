import React, { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";

import { cn } from "../src/lib/utils";

import { ThemeProvider, useTheme } from "../src/theme-provider";
import { TooltipProvider } from "./components/tooltip";

export const withTheme: Decorator = (StoryFn, context) => {
  // Get values from story parameter first, else fallback to globals
  const theme = (context.parameters.theme || context.globals.theme) as
    | "light"
    | "dark";

  //check if layout is set to fullscreen
  const isFullscreen = context.parameters.layout === "fullscreen";

  return (
    <ThemeProvider defaultTheme={theme}>
      <div
        className={cn(
          {
            "flex h-full min-h-screen flex-col": isFullscreen,
          },
          "bg-background-default"
        )}
      >
        <ChangeThemeHandler theme={theme} />
        <TooltipProvider>
          <StoryFn />
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
};

const ChangeThemeHandler = ({ theme }: { theme: "light" | "dark" }) => {
  const provider = useTheme();

  provider.setTheme(theme);
  return null;
};
