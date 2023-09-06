import { lazy } from "react";
import { TextWidget } from "../user-components/text/text";
import { WidgetFactory } from "./widget-factory";
import { ViewColorsConfig } from "@shared/views/src/view-config/view-colors";
import proposalsTable from "../widgets/proposals-table";
import proposalsAreaChart from "../widgets/proposals-area-chart";
import proposalsBarChart from "../widgets/proposals-bar-chart";
import categoriesBarChart from "../widgets/categories-bar-chart";
import proposalBudget from "../widgets/proposal-budget";

export const widgetFactory = new WidgetFactory();

widgetFactory.registerWidgetComponent(TextWidget);

widgetFactory.registerWidgetComponent(proposalsTable);
widgetFactory.registerWidgetComponent(proposalsAreaChart);
widgetFactory.registerWidgetComponent(proposalsBarChart);
widgetFactory.registerWidgetComponent(categoriesBarChart);
widgetFactory.registerWidgetComponent(proposalBudget);
