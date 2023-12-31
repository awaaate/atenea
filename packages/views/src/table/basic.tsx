import { useNode } from "@shared/editor/src/engine/nodes";
import { ScrollArea } from "@shared/ui/src/scroll-area";
import { cn } from "@shared/ui/src/utils";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

/**
 * Props for the TableView component.
 */
interface TableViewProps<TData> {
  className?: string;
  data: TData[];
  /**
   * A map of headers to be used for the table.
   */
}

export const BasicTableView = <TData extends {}>({
  data,
  className,
}: TableViewProps<TData>) => {
  const headerMap = useNode((node) => node.data.props.headerMap) as Record<
    keyof TData,
    string
  >;

  const headers = Object.keys(headerMap) as (keyof TData)[];

  return (
    <div className="w-full h-full">
      <Table className={cn("w-full h-full", className)}>
        <TableHead style={{ position: "sticky", top: 0 }}>
          <TableRow>
            {headers.map((header) => (
              <TableHeaderCell key={header as string}>
                {headerMap[header]}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {Object.keys(row).map((key: any) => {
                //check if it's enabled by the headers map
                if (headers.includes(key)) {
                  return (
                    <TableCell key={key}>
                      <Text>{row[key]}</Text>
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
