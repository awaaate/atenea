import { useNode } from "@craftjs/core";

import { WidgetConfig } from "../../widget/widget-config";

export const BarListCategoriesWidgetConfig = () => {
  const {
    // actions: { setProp },
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return <WidgetConfig></WidgetConfig>;
};
