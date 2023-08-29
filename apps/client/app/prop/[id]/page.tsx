import { db } from "@/db";
import { proposal } from "@/db/schema";
import { eq, not } from "drizzle-orm";
import React from "react";
import { notFound } from "next/navigation";
import { Button, Link } from "@shared/ui";

interface ProposalPageProps {
  params: {
    id: string;
  };
}
const ProposalPage = async ({ params }: ProposalPageProps) => {
  const uniqueProposal = await db
    .select()
    .from(proposal)
    .where(eq(proposal.id, parseInt(params.id)));

  if (!uniqueProposal) return notFound();

  return (
    <div>
      <div className="bg-accent text-text-on-accent p-4 flex justify-between ">
        <span>Working on proposal {params.id}</span>
        <Button>
          <Link href={`/admin/edit/${params.id}`}>Edit data</Link>{" "}
        </Button>
      </div>

      <pre>{JSON.stringify(uniqueProposal, null, 4)}</pre>
    </div>
  );
};

export default ProposalPage;
