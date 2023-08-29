DROP TABLE "_prisma_migrations";--> statement-breakpoint
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_projectId_fkey";
--> statement-breakpoint
ALTER TABLE "RoadmapSection" DROP CONSTRAINT "RoadmapSection_proposalId_fkey";
--> statement-breakpoint
ALTER TABLE "SocialHandle" DROP CONSTRAINT "SocialHandle_teamMemberName_fkey";
--> statement-breakpoint
ALTER TABLE "BudgetSection" DROP CONSTRAINT "BudgetSection_proposalId_fkey";
--> statement-breakpoint
ALTER TABLE "_CategoryToProposal" DROP CONSTRAINT "_CategoryToProposal_A_fkey";
--> statement-breakpoint
ALTER TABLE "_CategoryToProposal" DROP CONSTRAINT "_CategoryToProposal_B_fkey";
--> statement-breakpoint
ALTER TABLE "_ProposalToTeamMember" DROP CONSTRAINT "_ProposalToTeamMember_A_fkey";
--> statement-breakpoint
ALTER TABLE "_ProposalToTeamMember" DROP CONSTRAINT "_ProposalToTeamMember_B_fkey";
--> statement-breakpoint
ALTER TABLE "Category" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Project" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "RoadmapSection" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "SocialHandle" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "TeamMember" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "BudgetSection" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoadmapSection" ADD CONSTRAINT "RoadmapSection_proposalId_Proposal_id_fk" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SocialHandle" ADD CONSTRAINT "SocialHandle_teamMemberName_TeamMember_name_fk" FOREIGN KEY ("teamMemberName") REFERENCES "TeamMember"("name") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BudgetSection" ADD CONSTRAINT "BudgetSection_proposalId_Proposal_id_fk" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_CategoryToProposal" ADD CONSTRAINT "_CategoryToProposal_A_Category_name_fk" FOREIGN KEY ("A") REFERENCES "Category"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_CategoryToProposal" ADD CONSTRAINT "_CategoryToProposal_B_Proposal_id_fk" FOREIGN KEY ("B") REFERENCES "Proposal"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ProposalToTeamMember" ADD CONSTRAINT "_ProposalToTeamMember_A_Proposal_id_fk" FOREIGN KEY ("A") REFERENCES "Proposal"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_ProposalToTeamMember" ADD CONSTRAINT "_ProposalToTeamMember_B_TeamMember_name_fk" FOREIGN KEY ("B") REFERENCES "TeamMember"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
