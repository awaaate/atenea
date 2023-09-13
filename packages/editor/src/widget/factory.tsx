import { lazy } from "react";
import { TextWidget } from "../user-components/text/text";
import { WidgetFactory } from "./widget-factory";

import proposalsBarChart from "../widgets/proposals-bar-chart";
import proposalBudget from "../widgets/proposal-budget";
import nounsKpis from "../widgets/nouns-kpis";
import proposalTeam from "../widgets/proposal-team";
import proposalContentView from "../widgets/proposal-content-view";
import proposalVotes from "../widgets/proposal-votes";
import proposalKpi from "../widgets/proposal-kpi";
import treasury from "../widgets/treasury";
import nounOfDay from "../widgets/noun-of-day";
import activeProposals from "../widgets/active-proposals";
import incommingProposals from "../widgets/incomming-proposals";
import categoriesBudgetDonutChart from "../widgets/categories-budget-donut-chart";
import categoriesDonutChart from "../widgets/categories-donut-chart";
import popularTeams from "../widgets/popular-teams";
import proposalCategory from "../widgets/proposal-category";
import proposalTimeframeEnd from "../widgets/proposal-timeframe-end";
import proposalTimeframeStart from "../widgets/proposal-timeframe-start";

export const widgetFactory = new WidgetFactory();

widgetFactory.registerWidgetComponent(TextWidget);

widgetFactory.registerWidgetComponent(activeProposals);
widgetFactory.registerWidgetComponent(incommingProposals);
widgetFactory.registerWidgetComponent(categoriesBudgetDonutChart);
widgetFactory.registerWidgetComponent(categoriesDonutChart);
widgetFactory.registerWidgetComponent(popularTeams);
//widgetFactory.registerWidgetComponent(proposalsAreaChart);
widgetFactory.registerWidgetComponent(proposalsBarChart);
widgetFactory.registerWidgetComponent(proposalBudget);
widgetFactory.registerWidgetComponent(nounsKpis);
widgetFactory.registerWidgetComponent(proposalTeam);
widgetFactory.registerWidgetComponent(proposalVotes);
widgetFactory.registerWidgetComponent(proposalContentView);
widgetFactory.registerWidgetComponent(proposalKpi);
widgetFactory.registerWidgetComponent(treasury);

widgetFactory.registerWidgetComponent(proposalTimeframeEnd);
widgetFactory.registerWidgetComponent(proposalTimeframeStart);
widgetFactory.registerWidgetComponent(proposalCategory);
widgetFactory.registerWidgetComponent(nounOfDay);
