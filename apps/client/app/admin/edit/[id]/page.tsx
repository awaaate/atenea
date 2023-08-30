import { db } from "@/db";
import { proposal } from "@/db/schema";
import { eq, not } from "drizzle-orm";
import React from "react";
import { notFound } from "next/navigation";
import { Button, Link } from "@shared/ui";
import { ProposalForm } from "@/components/forms/proposal-form";
import { trpc } from "@/lib/trpcClient";
import { getUniqueProposal } from "@/server/getUniqueProposal";

interface ProposalPageProps {
  params: {
    id: string;
  };
}
const ProposalPage = async ({ params }: ProposalPageProps) => {
  const uniqueProposal = await getUniqueProposal(parseInt(params.id));
  console.log(JSON.stringify(uniqueProposal, null, 4));

  if (!uniqueProposal) return notFound();

  //@ts-expect-error
  return <ProposalForm {...uniqueProposal} />;
};

export default ProposalPage;
