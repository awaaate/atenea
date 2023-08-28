import { type UserComponent } from "@craftjs/core"

import { ProposalBudgetWidget } from "./donuts/proposal-budget-widget"

import { Text } from "./text"
import { Grid } from "./grid"
import { Widget } from "../widget/widget-types"


type UserLayoutComponentsType =
    | "Grid"
    | "Text"


type UserWidgetComponentsType =
    | "ProposalBudgetWidget"

const Layout = [
    {
        image: "",
        component: Grid,
        name: "Grid",
    },
    {
        image: "",
        component: Text,
        name: "Text",
    },
]

export const Widgets = [
    {
        image: "https://picsum.photos/seed/sdfsdfshola/200/100",
        component: ProposalBudgetWidget,
        name: "ProposalBudgetWidget",
    },

]

export const WidgetMap = Widgets.reduce((acc, curr) => {
    // @ts-ignore
    acc[curr.name] = curr.component
    return acc
}, {} as { [key: string]: Widget<unknown> })

export const UserComponentsList = [...Layout, ...Widgets]

//Map of name and component
export const UserComponents = UserComponentsList.reduce((acc, curr) => {
    acc[curr.name as UserComponentsType] = curr.component
    return acc
}, {} as {
    [key in UserComponentsType]: UserComponent
})

export const USER_COMPONENTS = {
    get: (type: UserComponentsType) => {
        return type
    },
}

export type UserComponentsType =
    | UserLayoutComponentsType
    | UserWidgetComponentsType

export function getComponentTypes(
    ...types: (UserComponentsType | "widgets")[]
) {
    return types.flatMap((type) => {
        if (type === "widgets") return Widgets.map((widget) => widget.component)
        /*       if (type in Layout) return Object.keys(Layout[type as UserLayoutComponentsType])
                  if (type in Widgets) return Object.keys(Widgets[type as UserWidgetComponentsType]) */
        return UserComponents[type as UserComponentsType]
    })
}
export const isWidget = (widget: UserComponent) => {
    return getComponentTypes("widgets").includes(widget)
}

/* export const isLayout = (layout: UserLayoutComponentsType) => {
  return !!Layout[layout]
} */
