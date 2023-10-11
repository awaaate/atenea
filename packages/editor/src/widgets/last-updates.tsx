import { ViewPropsConfig } from "@shared/views/src/view-config/fields/props-config";
import { lazy } from "react";
import { sourceFetcher } from "../lib/source-fetcher";
import { WidgetFactory } from "../widget/widget-factory";

const PropUpdatesList = lazy(() =>
  import("@shared/views/src/prop-updates/prop-updates-list").then((module) => ({
    default: module.PropUpdatesList,
  }))
);

export default WidgetFactory.createWidget({
  name: "last-updates",
  displayName: "Last Updates",
  group: "Prop updates",
  icon: "Clock",
  Config: () => (
    <>
      <ViewPropsConfig
        props={[{ name: "first", type: "number", label: "First" }]}
      />
    </>
  ),
  dataFetcher: {
    key: "updates",
    collector(props) {
      return {
        first: props.first as number,
      };
    },
    async fetcher(args) {
      if (!args) {
        return {
          data: [],
        }
      }
      const data = await sourceFetcher.getAllPropUpdates.query()

      return {
        data,
      };
    },
    mapper({ data }, { first }) {

      return {
        updates: data
          .map((p, idx) => ({
            proposer: p.prop.proposer,
            admin: p.admin,
            update: p.update,
            title: p.prop.title,
            date: p.date,
            index: idx,
            isCompleted: p.isCompleted,
            propId: p.prop.id,
          })).slice(0, first)
      };
    }

  },
  initialProps: {
    first: 5,
    title: "Last updates",
    layout: {
      w: Infinity,
      h: 12,
      x: 0,
      y: 0,
    },
  },
  View: PropUpdatesList,
});
