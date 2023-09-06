import { Color } from "@tremor/react";

export const TW_COLORS_MAP = {
    slate: "bg-slate-500 hover:bg-slate-600",
    gray: "bg-gray-500 hover:bg-gray-600",
    zinc: "bg-zinc-500 hover:bg-zinc-600",
    neutral: "bg-neutral-500 hover:bg-neutral-600",
    stone: "bg-stone-500 hover:bg-stone-600",
    red: "bg-red-500 hover:bg-red-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    amber: "bg-amber-500 hover:bg-amber-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    lime: "bg-lime-500 hover:bg-lime-600",
    green: "bg-green-500 hover:bg-green-600",
    emerald: "bg-emerald-500 hover:bg-emerald-600",
    teal: "bg-teal-500 hover:bg-teal-600",
    cyan: "bg-cyan-500 hover:bg-cyan-600",
    sky: "bg-sky-500 hover:bg-sky-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
    violet: "bg-violet-500  hover:bg-violet-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    rose: "bg-rose-500 hover:bg-rose-600",
};

export function getBackgroundColor(color: Color) {
    return TW_COLORS_MAP[color];
}