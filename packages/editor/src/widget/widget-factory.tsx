import { Suspense, useCallback } from "react";
import {
  EditorState,
  Node,
  WidgetComponent,
  WidgetComponentConfig,
} from "../engine/interfaces";
import { useNode } from "../engine/nodes";
import { WidgetConfig } from "./widget-config";
import { WidgetRoot } from "./widget-root";
import { WidgetProps, createWidgetProps } from "./widget-types";
import { useEditorStore } from "../engine/editor";
import { SPINNER_SKELETON } from "./skeletons";

interface TestProps {
  name: string;
}

type extraConfig = Omit<
  WidgetComponentConfig<WidgetProps>,
  "defaultProps" | "related"
>;
// [key, selector, dataFetcher]

/**
 * Arguments for creating a widget.
 * @template TData The type of data that the widget fetcher will display.
 * @template TArgs The type of arguments that the widget fetcher will receive.
 */
interface CreateWidgetArgs<
  TData extends {},
  TArgs extends Partial<WidgetProps> | undefined,
  TMappedData extends {}
> extends extraConfig {
  name: string;
  View:
    | React.FunctionComponent<TMappedData>
    | React.LazyExoticComponent<React.FunctionComponent<TMappedData>>;
  Config: React.FunctionComponent;
  FullScreenView?:
    | React.FunctionComponent<TMappedData>
    | React.LazyExoticComponent<React.FunctionComponent<TMappedData>>;
  skeleton?: React.ReactNode;
  dataFetcher: {
    key: string;
    collector?: (
      props: WidgetProps & {
        requestVariables?: object;
      }
    ) => TArgs;
    fetcher: (args: TArgs | undefined) => Promise<TData>;
    mapper?: (data: TData, args: TArgs) => TMappedData;
  };
  initialProps: Partial<WidgetProps>;
}
const defaultArgs = {
  skeleton: SPINNER_SKELETON,
};

export class WidgetFactory {
  widgets: Map<string, WidgetComponent> = new Map();

  static createWidget<
    TData extends {},
    TArgs extends Partial<WidgetProps>,
    TMapped extends {}
  >(args: CreateWidgetArgs<TData, TArgs, TMapped>) {
    args.skeleton = args.skeleton || defaultArgs.skeleton;
    args.FullScreenView = args.FullScreenView ? args.FullScreenView : args.View;

    const component: WidgetComponent = () => {
      const { id } = useNode();
      const collectorFunc = useCallback(
        (state: EditorState) => {
          return args.dataFetcher.collector
            ? args.dataFetcher.collector(state.nodes[id].data.props)
            : undefined;
        },
        [id]
      );

      const dataFetcherArgs = useEditorStore(collectorFunc);
      const fetcherFunction = useCallback(() => {
        if (!dataFetcherArgs) return args.dataFetcher.fetcher(undefined);
        return args.dataFetcher.fetcher(dataFetcherArgs);
      }, [dataFetcherArgs]);
      const mapperFunction = useCallback(
        (data: TData) => {
          console.log("MAPPER FUNCTION:", data);
          if (!args.dataFetcher.mapper) return data as unknown as TMapped;
          return args.dataFetcher.mapper(data, dataFetcherArgs as TArgs);
        },
        [args.dataFetcher.mapper, dataFetcherArgs]
      );
      return (
        <WidgetRoot
          dataFetcher={[
            args.dataFetcher.key +
              JSON.stringify(dataFetcherArgs?.requestVariables),
            fetcherFunction,
          ]}
          mapper={mapperFunction}
          inner={(data) => (
            <Suspense fallback={args.skeleton}>
              {/* @ts-ignore */}
              <args.View {...data} />
            </Suspense>
          )}
          fullScreen={(data) => (
            <Suspense fallback={args.skeleton}>
              {/* @ts-ignore */}
              <args.FullScreenView {...data} />
            </Suspense>
          )}
          skeleton={args.skeleton}
        />
      );
    };
    const configComponent = () => {
      return (
        <WidgetConfig>
          <args.Config />
        </WidgetConfig>
      );
    };
    component.node = {
      defaultProps: createWidgetProps(args.initialProps),
      name: args.name,
      related: {
        toolbar: configComponent,
      },
      displayName: args.displayName,
      group: args.group,
      icon: args.icon,
      image: args.image,
    };
    return component;
  }

  registerWidget(name: string, component: WidgetComponent) {
    this.widgets.set(name, component);
  }

  registerWidgetComponent(component: WidgetComponent) {
    this.widgets.set(component.node.name, component);
  }

  getWidget(name: string) {
    return this.widgets.get(name);
  }
}
