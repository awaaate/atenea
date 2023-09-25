import { useNodeActions } from "@shared/editor/src/engine/nodes";
import { cn } from "@shared/ui/src/utils";
import React from "react";
export const TreasuryView: React.FC<{
  data: {
    id: string;
    name: string;
    current_usd_price: number;
    quantity: number;
    symbol: string;
    logo: {
      width: number;
      height: number;
      src: string;
    };
  }[];
}> = ({ data }) => {
  const filteredData = data
    .filter((item) => item.current_usd_price > 0)
    .sort((a, b) => {
      if (a.current_usd_price > b.current_usd_price) return -1;
      if (a.current_usd_price < b.current_usd_price) return 1;
      return 0;
    });

  const totalUsd = data.reduce((acc, item) => {
    return acc + item.current_usd_price;
  }, 0);

  const { setNode } = useNodeActions();

  React.useEffect(() => {
    setNode((node) => {
      node.data.props.className = "rounded-lg bg-red p-1 ";
      return node;
    });
  }, [filteredData.length]);
  return (
    <div className="border rounded-lg w-full  mx-auto bg-surface-default shadow-card">
      <div className="w-full border-b py-4 px-6 ">
        <span>
          <span className="text-2xl font-bold">
            {totalUsd.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          <span>
            <span className="text-sm font-medium text-gray-500">
              {" "}
              - {filteredData.length} Assets
            </span>
          </span>
        </span>
      </div>

      <div className="grid grid-cols-3 w-full border-b">
        <ColumnHeader title="Asset" className="px-6 py-2" />
        <ColumnHeader title="Quantity" className="px-6 py-2" />
        <ColumnHeader title="Value" className="px-6 py-2" />
      </div>
      {filteredData.map((item, i) => {
        return (
          <div
            className={cn(
              "grid grid-cols-3 w-full py-2",
              i % 2 === 0 ? "bg-surface-default" : "bg-surface-raised"
            )}
            key={item.id}
          >
            <div className="px-6 py-2">
              <div className="flex items-center">
                <div className="flex-shrink-0 icon-l">
                  <img
                    className=" rounded-full icon-l"
                    src={item.logo.src}
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-md font-medium text-text">
                    {item.name}
                  </div>
                  <div className="text-sm text-text-weakest">{item.symbol}</div>
                </div>
              </div>
            </div>
            <div className="px-6 py-2">
              <div className="text-md font-medium text-text-weaker">
                {item.quantity.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
            <div className="px-6 py-2">
              <div className="text-md font-medium text-text-weaker">
                {item.current_usd_price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ColumnHeader: React.FC<{
  title: string;
  className?: string;
}> = ({ title, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-md font-bold  ">{title}</span>
    </div>
  );
};
