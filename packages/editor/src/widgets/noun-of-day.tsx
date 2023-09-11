import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";
import { API_URL } from "../constants";

const NounOfDay = lazy(() =>
  import("@shared/views/src/noun-of-day/noun-of-day").then((module) => ({
    default: module.NounOfDay,
  }))
);
export default WidgetFactory.createWidget({
  name: "noun-of-day",
  displayName: "Noun of Day",
  group: "general",
  icon: "Clock",
  View: NounOfDay,
  initialProps: {
    title: "Noun of Day",
    layout: {
      w: 9,
      x: 0,
      y: 0,
      h: 12,
    },
  },
  Config: () => null,
  dataFetcher: {
    key: "noun-of-day",
    async fetcher(args) {
      const noun = await sourceFetcher.getNounOfTheDay.query();
      return {
        currentBid: noun.currentBid,
        endTime: noun.endTime,
        id: noun.nounId,
        image: `${API_URL}/noun-image/${noun.nounId}`,
      };
    },
  },
});
