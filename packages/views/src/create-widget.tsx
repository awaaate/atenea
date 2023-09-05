import { UserComponent } from "@shared/editor/src/engine/interfaces";
import { WidgetConfig } from "@shared/editor/src/widget/widget-config";
import { WidgetRoot } from "@shared/editor/src/widget/widget-root";
import { WidgetProps } from "@shared/editor/src/widget/widget-types";
import React, { Suspense } from "react";
interface TestProps {
  name: string;
}
interface CreateWidgetArgs {
  name: string;
  id: string;
  View: React.FunctionComponent<TestProps>;
  loading: React.ReactElement<TestProps>;
  config: React.ReactElement<TestProps>;
  dataEndpoint: string;
  initalProps: Partial<WidgetProps>;
}

async function dataFetcher() {
  throw new Error("Function not implemented.");
}

export const createWidget = ({
  View,
  config,
  loading,
  name,
  initalProps,
}: CreateWidgetArgs) => {
  const component: UserComponent = () => (
    <WidgetRoot
      dataFetcher={[
        "hello",
        async () => {
          return "hello";
        },
      ]}
      inner={(props: any) => (
        <Suspense fallback={<div>Loading...</div>}>
          <View {...props} />
        </Suspense>
      )}
      fullScreen={(props: any) => (
        <Suspense fallback={<div>Loading...</div>}>
          <View {...props} />
        </Suspense>
      )}
      skeleton={loading}
    />
  );

  const configComponent = () => (
    <WidgetConfig>{React.cloneElement(config, {})}</WidgetConfig>
  );

  component.node = {
    defaultProps: initalProps,
    displayName: name,
    related: {
      toolbar: configComponent,
    },
  };

  return component;
};

const ProposalDonutChart = createWidget({
  name: "Donut Chart",
  id: "donut-chart",
  dataEndpoint: "http://localhost:8080/api/v1/query",
  View: ({ name }) => <div>View</div>,
  loading: <div>Loading...</div>,
  config: <div>Config</div>,
  initalProps: {
    data: [
      {
        name: "New York",
        sales: 9800,
      },
    ],
  },
});
