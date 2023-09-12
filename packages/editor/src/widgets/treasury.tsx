import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";

const TreasuryView = lazy(() =>
  import("@shared/views/src/treasury/treasury").then((module) => ({
    default: module.TreasuryView,
  }))
);
export default WidgetFactory.createWidget({
  name: "treasury",
  displayName: "Treasury",
  group: "general",
  icon: "Star",

  View: TreasuryView,
  initialProps: {
    title: "Treasury",
    layout: {
      w: Infinity,
      x: 0,
      y: 0,
      h: 12,
    },
  },
  Config: () => null,
  dataFetcher: {
    key: "treasury",
    async fetcher(args) {
      return {};
    },
  },
});
