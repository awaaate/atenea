
import { ProposalBudgetWidget } from "./donuts/proposal-budget-widget"

import { BarListCategoriesWidget } from "./bar-list/bar-list-categories-widget"
import { Text } from "./text"



export type WidgetComponentsType =
    | "ProposalBudgetWidget" | "BarListCategoriesWidget" | "Text"


export const WIDGET_NAMES = {
    [ProposalBudgetWidget.node.displayName]: "ProposalBudgetWidget",
    [BarListCategoriesWidget.node.displayName]: "BarListCategoriesWidget",
    [Text.node.displayName]: "Text",
} as const


export const Widgets = [
    {
        image: "https://picsum.photos/seed/sdfsdfshola/200/100",
        component: ProposalBudgetWidget,
        name: "ProposalBudgetWidget",
    },
    {
        image: "https://picsum.photos/seed/sdfsdfshola/200/100",
        component: BarListCategoriesWidget,
        name: "BarListCategoriesWidget",
    },
    {
        image: "https://picsum.photos/seed/sdfsdfshola/200/100",
        component: Text,
        name: "Text",
    },
]

export function getWidget(name: WidgetComponentsType) {
    return Widgets.find((widget) => widget.name === name)
}


/* export const isLayout = (layout: UserLayoutComponentsType) => {
  return !!Layout[layout]
} */
