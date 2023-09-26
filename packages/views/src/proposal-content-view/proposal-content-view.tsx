"use client";
import { useNode, useNodeActions } from "@shared/editor/src/engine/nodes";
import { Badge } from "@shared/ui/src/badge";
import { Icon } from "@shared/ui/src/icon";
import { Markdown } from "@shared/ui/src/markdown";
import React, { useEffect } from "react";

interface ProposalContentViewProps {
  description: string;
  title: string;
  content: string;
}

export const ProposalContentView: React.FC<ProposalContentViewProps> = ({
  description,
  title,
  content,
}) => {
  const proposalId = useNode((node) => node.data.props.proposalId as number);
  const isFullScreen = useNode((node) => node.data.props.fullScreen);
  const { setNode } = useNodeActions();

  useEffect(() => {
    setNode((node) => {
      node.data.props.title = title;
      return node;
    });
  }, [proposalId]);

  if (isFullScreen) {
    return (
      <div className="flex flex-col gap-2">
        <Markdown className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full">
          {content}
        </Markdown>
      </div>
    );
  }

  return (
    <div className="p-2 text-weak">
      <p>{description}</p>
      <Badge
        variant="highlight"
        className="mt-2"
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
      </Badge>
    </div>
  );
};
