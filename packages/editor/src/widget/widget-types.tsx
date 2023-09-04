import { Layout } from "react-grid-layout";
import { UserComponent } from "../engine/interfaces";
import { ComponentWithRichEditor } from "../hooks/rich-text/use-rich-editor";
export interface WidgetProps {
  width: number;
  height: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  background: string;
  borderRadius: number;
  gridSpan: number;
  layout: Partial<Layout>;
  fullScreen: boolean;
  sidePannel: boolean;
  controls: "simple" | "full";
  title: string;
  [key: string]: unknown
}
export const WIDGET_DEFAULT: WidgetProps = {
  controls: "simple",
  width: 100,
  height: 100,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  sidePannel: false,
  fullScreen: false,
  background: "transparent",
  title: "",
  borderRadius: 0,
  gridSpan: 1,
  layout: {
    i: "",
    x: 0,
    y: 0,
    w: 3,
    h: 1,
    isResizable: true,
  },
};

export const createWidgetProps = <
  T extends Partial<ComponentWithRichEditor> & object
>(
  props: T
) => {
  return {
    ...WIDGET_DEFAULT,
    ...props,
  };
};

export type Widget<T = unknown> = UserComponent<Partial<WidgetProps & T>>;
