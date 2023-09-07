import React from "react";

type Component<TProps> =
  | React.FC<TProps>
  | React.ComponentClass<TProps>
  | React.ExoticComponent<TProps>;
export function joinViews<TViews extends Component<any>[]>(...views: TViews) {
  const JoinedViews: React.FC<{
    viewsProps: TViews[number] extends React.FC<infer TProps> ? TProps : never;
  }> = (props) => {
    return (
      <>
        {views.map((View, index) => {
          // @ts-expect-error
          const componentProps = props.viewsProps[index];
          return React.createElement(View, componentProps || {});
        })}
      </>
    );
  };
  return JoinedViews;
}
