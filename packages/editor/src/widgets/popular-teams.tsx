import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";

const PopularTeamsView = lazy(() =>
  import("@shared/views/src/team/popular-teams").then((module) => ({
    default: module.PopularTeamsView,
  }))
);

export default WidgetFactory.createWidget({
  name: "popular-teams",
  displayName: "Nouns Founded Teams",
  group: "general",
  icon: "Users",

  View: PopularTeamsView,
  Config: () => null,
  initialProps: {
    title: "Nouns Founded Teams",
    layout: {
      w: 9,
      x: 0,
      y: 0,
      h: 12,
    },
  },
  dataFetcher: {
    key: "popular-teams",
    async fetcher(args) {
      return {};
    },
  },
});
