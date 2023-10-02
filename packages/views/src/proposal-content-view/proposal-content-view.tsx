"use client";
import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { Badge } from "@shared/ui/src/badge";
import { Button } from "@shared/ui/src/button";
import { Icon } from "@shared/ui/src/icon";
import { Markdown } from "@shared/ui/src/markdown";
import React, { useEffect } from "react";

interface ProposalContentViewProps {
  description: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
}

export const ProposalContentView: React.FC<ProposalContentViewProps> = ({
  description,
  title,
  content,
  createdAt,
  status,
}) => {
  const proposalId = useNode((node) => node.data.props.proposalId as number);
  const isFullScreen = useNode((node) => node.data.props.fullScreen);
  const { setNode } = useNodeActions();
  /*   useEffect(() => {
    setNode((node) => {
      node.data.props.title = title;
      return node;
    });
  }, [proposalId]); */

  if (isFullScreen) {
    return (
      <div className="flex flex-col gap-2">
        <Markdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full">
          {content}
        </Markdown>
      </div>
    );
  }
  const hasDescription = description && description.length > 0;
  return (
    <div className="p-2 text-weak">
      {hasDescription && <h3 className="text-xl font-semibold">{title}</h3>}
      <Badge
        className="text-sm mb-2"
        variant={
          status === "Pending"
            ? "info"
            : status === "Succeeded"
            ? "success"
            : status === "Canceled" || status === "Defeated"
            ? "danger"
            : "warning"
        }
      >
        {status}
      </Badge>
      {hasDescription ? (
        <p>{description.slice(0, 400)}...</p>
      ) : (
        <Markdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full">
          {content.slice(0, 400) + "..."}
        </Markdown>
      )}
      <Button
        className="mt-4"
        onClick={() => {
          setNode((node) => {
            node.data.props.fullScreen = true;
            return node;
          });
        }}
      >
        <button>
          <Icon name="Eye" className="mr-2" />
          Read More
        </button>
      </Button>
    </div>
  );
};
