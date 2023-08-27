import typographyPlugin from "@tailwindcss/typography"
import type { Config } from "tailwindcss"
// @ts-ignore
import animatePlugin from "tailwindcss-animate"

import { tremorPlugin } from "./tremor-plugin"
import { themePlugin } from "./theme-plugin"


export const tremorPreset = {
    content: [],
    darkMode: ["class"],
    plugins: [animatePlugin, typographyPlugin, tremorPlugin, themePlugin],
} satisfies Config
