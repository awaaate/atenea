import type { Config, } from "tailwindcss"

import { sharedConfig, themePreset } from "@shared/tailwind-config"


const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  },
  presets: [themePreset],
} satisfies Config

export default config
