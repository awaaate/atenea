import { lazy } from "react";
import { WidgetFactory } from "../widget/widget-factory";
import { sourceFetcher } from "../lib/source-fetcher";

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
    className: "rounded-lg bg-transparent p-1",
    layout: {
      w: Infinity,
      x: 0,
      y: 0,
      h: 23,
    },
  },
  Config: () => null,
  dataFetcher: {
    key: "treasury",
    async fetcher(args) {
      try {
        const data = await sourceFetcher.getNounsBalance.query();
        if (!data)
          return {
            data: [],
          };
        return {
          data: data.map((item, i) => {
            return {
              id: item.symbol,
              name: item.name,
              current_usd_price: item.current_usd_price,
              quantity: parseInt(item.balance, 16) / 10 ** item.decimals,
              symbol: item.symbol,
              logo: item.logos[0] && {
                width: item.logos[0].width,
                height: item.logos[0].height,
                src: item.logos[0].uri,
              },
            };
          }),
        };
      } catch (error) {
        console.log("error", error);
        return {
          data: [],
        };
      }
    },
  },
});
