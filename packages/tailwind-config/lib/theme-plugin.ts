import plugin from "tailwindcss/plugin"
import { DARK_THEME, DEFAULT_THEME, THEME } from "../themes"
import type { Config } from "tailwindcss";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },

  typography: {
    DEFAULT: { // this is for prose class
      css: {
        color: THEME.color["text"],
        lineHeight: THEME["line-height"]["default"],
        fontFamily: THEME["font-family"]["default"],
      },
    },
  },
  extend: {
    colors: {
      ...THEME.color,

    },
    borderRadius: {
      ...THEME["border-radius"]
    },
    fontFamily: {
      ...THEME["font-family"],
    },
    fontSize: {
      ...THEME["font-size"],
    },
    fontWeight: {
      ...THEME["font-weight"],
    },
    lineHeight: {
      ...THEME["line-height"],
    },
    boxShadow: {
      ...THEME["box-shadow"],
    },
    zIndex: {
      ...THEME["index"],
    },

    spacing: {
      ...THEME.space,
    },

    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    typography: ({ theme }) => ({
      default: {
        css: {
          '--tw-prose-body': THEME.color["text"],
          '--tw-prose-headings': THEME.color["text"],
          '--tw-prose-lead': THEME.color["text-weakest"],
          '--tw-prose-links': THEME.color["text"],
          '--tw-prose-bold': THEME.color["text"],
          '--tw-prose-counters': THEME.color["text-weakest"],
          '--tw-prose-bullets': THEME.color["text-weakest"],
          '--tw-prose-hr': THEME.color["border"]["default"],
          '--tw-prose-quotes': THEME.color["text"],
          '--tw-prose-quote-borders': THEME.color["border"]["default"],
          '--tw-prose-captions': THEME.color["text-weaker"],
          '--tw-prose-code': THEME.color["text"],
          '--tw-prose-pre-code': THEME.color["text-weakest"],
          '--tw-prose-pre-bg': THEME.color["text"],
          '--tw-prose-th-borders': THEME.color["border"]["default"],
          '--tw-prose-td-borders': THEME.color["border"]["default"],
          '--tw-prose-invert-body': THEME.color["text"],
          '--tw-prose-invert-headings': THEME.color["text"],
          '--tw-prose-invert-lead': THEME.color["text"],
          '--tw-prose-invert-links': THEME.color["text-link"],
          '--tw-prose-invert-bold': THEME.color["text"],
          '--tw-prose-invert-counters': THEME.color["text-weakest"],
          '--tw-prose-invert-bullets': THEME.color["text"],
          '--tw-prose-invert-hr': THEME.color["text"],
          '--tw-prose-invert-quotes': THEME.color["text"],
          '--tw-prose-invert-quote-borders': THEME.color["text"],
          '--tw-prose-invert-captions': THEME.color["text"],
          '--tw-prose-invert-code': THEME.color["text"],
          '--tw-prose-invert-pre-code': THEME.color["text"],
          '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
          '--tw-prose-invert-th-borders': THEME.color["border"]["default"],
          '--tw-prose-invert-td-borders': THEME.color["border"]["default"],
          lineHeight: THEME["line-height"]["default"],
          fontFamily: THEME["font-family"]["default"],

        },
      },
    }),
  },
}

export const themePlugin = plugin(
  function ({ addBase, addUtilities }) {
    addBase({
      ":root": DEFAULT_THEME,
      ".dark": DARK_THEME,
      "*": {
        borderColor: THEME.color["border"]["default"],
      },
      "html, body": {
        backgroundColor: THEME.color["background"]["default"],
        minWidth: "320px",
        minHeight: "100vh",
        height: "100%",
      },
      "body": {
        color: THEME.color["text"],
        fontSize: THEME["font-size"]["lg"],
        fontFamily: THEME["font-family"]["default"],
        fontWeight: THEME["font-weight"]["weight-default"],
        lineHeight: THEME["line-height"]["default"],
        transition: THEME["transition"]["quickly"],
      },


    })
    addUtilities({
      ".icon-xxs": {
        width: THEME["size-icon"]["icon-xxs"],
        height: THEME["size-icon"]["icon-xxs"],
      },
      ".icon-xs": {
        width: THEME["size-icon"]["icon-xs"],
        height: THEME["size-icon"]["icon-xs"],
      },
      ".icon-s": {
        width: THEME["size-icon"]["icon-s"],
        height: THEME["size-icon"]["icon-s"],
      },
      ".icon-m": {
        width: THEME["size-icon"]["icon-m"],
        height: THEME["size-icon"]["icon-m"],
      },
      ".icon-l": {
        width: THEME["size-icon"]["icon-l"],
        height: THEME["size-icon"]["icon-l"],
      },
      ".icon-xl": {
        width: THEME["size-icon"]["icon-xl"],
        height: THEME["size-icon"]["icon-xl"],
      },
      ".icon-xxl": {
        width: THEME["size-icon"]["icon-xxl"],
        height: THEME["size-icon"]["icon-xxl"],
      },
      ".transion-quickly": {
        transition: THEME["transition"]["quickly"],
      },
      ".transion-slowly": {
        transition: THEME["transition"]["slowly"],
      },
      ".transion-mobile": {
        transition: THEME["transition"]["mobile"],
      },
    })
  },
  { theme }
)
