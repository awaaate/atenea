import { db } from "@/db";
import { Card, CardContent, CardHeader, Link } from "@shared/ui";
import React from "react";

const ProposalPage = async () => {
  const proposals = await db.query.proposal.findMany();
  return (
    <Card>
      <CardHeader>
        <span className="text-xl font-bold">Proposals</span>
        <span className="text-sm font-light ml-2">
          {proposals.length} proposals
        </span>
      </CardHeader>
      <CardContent>
        {proposals.map((proposal) => (
          <Link
            key={proposal.id}
            className="flex flex-col p-4 shadow-card border  bg-surface-raised cursor-pointer hover:bg-surface-default transition-colors"
            href={`/prop/${proposal.id}`}
          >
            <span className="text-lg font-bold">{proposal.title}</span>
            <span className="text-sm font-light">{proposal.description}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProposalPage;
