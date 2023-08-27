import { tremorPreset } from "@shared/tailwind-config"
import type { Config } from "tailwindcss"


const config = {
    content: [
        "./src/**/*.{ts,tsx}",
        "./src/**/*.{md,mdx}",
        "./node_modules/@shared/ui/src/**/*.{ts,tsx}",
        "./node_modules/@shared/editor/node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@shared/editor/src/**/*.{js,ts,jsx,tsx}"
    ],
    presets: [tremorPreset],
} satisfies Config

export default config
