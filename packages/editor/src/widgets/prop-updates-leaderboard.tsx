import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";

const PropUpdatesLeaderboard = lazy(() =>
  import("@shared/views/src/prop-updates/prop-updates-leaderboard").then((module) => ({
    default: module.PropUpdatesLeaderboard
  }))
);

export default WidgetFactory.createWidget({
  name: "prop-updates-leaderboard",
  displayName: "Prop Updates Leaderboard",
  group: "Prop updates",
  icon: "Star",
  Config: () => null,
  View: PropUpdatesLeaderboard,
  dataFetcher: {
    key: "updates",
    async fetcher() {
      const data = await sourceFetcher.getAllPropUpdates.query()

      return {
        data,
      };
    },
    mapper({ data }) {

      return {
        updates: data
      }
    }
  },
  initialProps: {
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },

})
