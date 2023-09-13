import { useNode } from "@shared/editor/src/engine/nodes";
import { cn } from "@shared/ui/src/utils";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@tremor/react";

import { Badge } from "@shared/ui/src/badge";
import { Avatar } from "@shared/ui/src/avatar";
import { API_URL } from "@shared/editor/src/constants";

interface ProposalTableProps {
  title: string;
  nounId?: number;
  status: string;
  budget: number | string;
  categories: string[];
  startAt: string;
  endAt: string;
}

export const ProposalTable: React.FC<{
  data: ProposalTableProps[];
}> = ({ data }) => {
  const headerMap = useNode((node) => node.data.props.headerMap) as Record<
    string,
    string
  >;

  const headers = Object.keys(headerMap) as (keyof ProposalTableProps)[];

  return (
    <div className="w-full h-full">
      <Table className={cn("w-full h-full")}>
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
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => {
                //check if it's enabled by the headers map

                const value = row[header];

                if (header === "status") {
                  return (
                    <TableCell key={header}>
                      <Badge
                        variant={
                          value === "Succeeded"
                            ? "success"
                            : value === "Pending"
                            ? "info"
                            : "danger"
                        }
                      >
                        {value}
                      </Badge>
                    </TableCell>
                  );
                }
                if (header === "categories") {
                  return (
                    <TableCell key={header}>
                      <Badge color="">{value}</Badge>
                    </TableCell>
                  );
                }
                if (header === "nounId") {
                  return (
                    <TableCell
                      key={header}
                      className="flex item-center justify-center "
                    >
                      {value ? (
                        <img
                          src={`${API_URL}/noun-image/${value}`}
                          alt=""
                          className="icon-xl rounded-full"
                        />
                      ) : (
                        <Avatar
                          key={header}
                          name="Nounner"
                          className="icon-xl"
                        />
                      )}
                    </TableCell>
                  );
                }

                return <TableCell key={header}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
