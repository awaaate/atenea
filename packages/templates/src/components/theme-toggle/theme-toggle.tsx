"use client";

import { Button, Icon } from "@shared/ui";
import { useTheme } from "../../../.storybook/decorators";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="primary"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="shadow-none"
    >
      <Icon
        name="Sun"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-text-on-accent"
        aria-hidden="true"
      />
      <Icon
        name="Moon"
        className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-text-on-accent"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
