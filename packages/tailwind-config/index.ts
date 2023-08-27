import type { Config } from "tailwindcss"
export const sharedConfig = {
  content: [
    "./node_modules/@shared/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config


export const withTremorConfig = {
  content: [
    ...sharedConfig.content,
    "../../node_modules/@tremor/**/*.{js,ts,jsx,tsx}",

  ]
}
export * from "./lib/tremor-preset"
export * from "./lib/theme-plugin"
export * from "./lib/theme-preset"