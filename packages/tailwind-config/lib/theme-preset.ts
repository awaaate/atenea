import typographyPlugin from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
// @ts-ignore
import animatePlugin from "tailwindcss-animate"

import { themePlugin } from "./theme-plugin"
export const themePreset = {
  content: [],
  darkMode: ["class"],
  plugins: [animatePlugin, typographyPlugin, themePlugin,],
} satisfies Config
