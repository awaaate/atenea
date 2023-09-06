import { lazy } from "react";
import { TextWidget } from "../user-components/text/text";
import { WidgetFactory } from "./widget-factory";

import proposalsTable from "../widgets/proposals-table";
import proposalsBarChart from "../widgets/proposals-bar-chart";
import categoriesBarChart from "../widgets/categories-bar-chart";
import proposalBudget from "../widgets/proposal-budget";

export const widgetFactory = new WidgetFactory();

widgetFactory.registerWidgetComponent(TextWidget);

widgetFactory.registerWidgetComponent(proposalsTable);
//widgetFactory.registerWidgetComponent(proposalsAreaChart);
widgetFactory.registerWidgetComponent(proposalsBarChart);
widgetFactory.registerWidgetComponent(categoriesBarChart);
widgetFactory.registerWidgetComponent(proposalBudget);
