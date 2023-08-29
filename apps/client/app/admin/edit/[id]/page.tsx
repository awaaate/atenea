import { db } from "@/db";
import { proposal } from "@/db/schema";
import { eq, not } from "drizzle-orm";
import React from "react";
import { notFound } from "next/navigation";
import { Button, Link } from "@shared/ui";
import { ProposalForm } from "@/components/forms/proposal-form";

interface ProposalPageProps {
  params: {
    id: string;
  };
}
const ProposalPage = async ({ params }: ProposalPageProps) => {
  const uniqueProposal = await db.query.proposal.findMany({
    where(fields, operators) {
      return operators.eq(fields.id, parseInt(params.id));
    },
    with: {
      project: true,
      budgetSections: true,
      roadmapSections: true,
    },
  });

  if (!uniqueProposal) return notFound();
  const prop = uniqueProposal[0];

  let proposalToTeamMember = await db.query.proposalToTeamMember.findMany({
    where(fields, operators) {
      return operators.eq(fields.proposalId, parseInt(params.id));
    },
  });

  let categoryToProposal = await db.query.categoryToProposal.findMany({
    where(fields, operators) {
      return operators.eq(fields.proposalId, parseInt(params.id));
    },
  });

  let team = await db.query.teamMember.findMany({
    with: {
      socialHandles: true,
    },
    where(fields, operators) {
      return operators.or(
        ...proposalToTeamMember.map((t) =>
          operators.eq(fields.name, t.teamMemberName)
        )
      );
    },
  });

  let categories = await db.query.category.findMany({
    where(fields, operators) {
      return operators.or(
        ...categoryToProposal.map((c) =>
          operators.eq(fields.name, c.categoryName)
        )
      );
    },
  });
  let data = {
    id: prop.id,
    title: prop.title,
    description: prop.description,
    budget: {
      totalAmount: prop.budgetTotal,
      items: prop.budgetSections.map((b) => {
        return {
          name: b.name,
          amount: b.amount,
          description: b.description,
          id: b.id,
        };
      }),
    },
    roadmap: {
      items: prop.roadmapSections.map((r) => {
        return {
          name: r.name,
          description: r.description,
          id: r.id,
        };
      }),
    },
    team,
    categories,
    project: prop.project ? prop.project : undefined,
  };
  return <ProposalForm {...data} />;
};

export default ProposalPage;
