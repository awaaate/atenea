import type { Config, } from "tailwindcss"

import { withTremorConfig, tremorPreset, } from "@shared/tailwind-config"

const config = {
  ...withTremorConfig,
  content: [

    ...withTremorConfig.content,
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
  },
  presets: [tremorPreset],
} satisfies Config

export default config
