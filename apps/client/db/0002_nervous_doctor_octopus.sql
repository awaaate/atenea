ALTER TABLE "_CategoryToProposal" RENAME TO "category_to_proposal";--> statement-breakpoint
ALTER TABLE "_ProposalToTeamMember" RENAME TO "proposal_to_team_member";--> statement-breakpoint
ALTER TABLE "category_to_proposal" RENAME COLUMN "A" TO "category_name";--> statement-breakpoint
ALTER TABLE "category_to_proposal" RENAME COLUMN "B" TO "proposal_id";--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" RENAME COLUMN "B" TO "propposal_id";--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" RENAME COLUMN "A" TO "team_member_id";--> statement-breakpoint
ALTER TABLE "BudgetSection" DROP CONSTRAINT "BudgetSection_proposalId_Proposal_id_fk";
--> statement-breakpoint
ALTER TABLE "Proposal" DROP CONSTRAINT "Proposal_projectId_Project_id_fk";
--> statement-breakpoint
ALTER TABLE "RoadmapSection" DROP CONSTRAINT "RoadmapSection_proposalId_Proposal_id_fk";
--> statement-breakpoint
ALTER TABLE "SocialHandle" DROP CONSTRAINT "SocialHandle_teamMemberName_TeamMember_name_fk";
--> statement-breakpoint
ALTER TABLE "category_to_proposal" DROP CONSTRAINT "_CategoryToProposal_A_Category_name_fk";
--> statement-breakpoint
ALTER TABLE "category_to_proposal" DROP CONSTRAINT "_CategoryToProposal_B_Proposal_id_fk";
--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" DROP CONSTRAINT "_ProposalToTeamMember_A_Proposal_id_fk";
--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" DROP CONSTRAINT "_ProposalToTeamMember_B_TeamMember_name_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "_CategoryToProposal_AB_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "_CategoryToProposal_B_index";--> statement-breakpoint
DROP INDEX IF EXISTS "_ProposalToTeamMember_AB_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "_ProposalToTeamMember_B_index";--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" ALTER COLUMN "propposal_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" ALTER COLUMN "team_member_id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proposal_to_team_member" ADD CONSTRAINT "proposal_to_team_member_propposal_id_Proposal_id_fk" FOREIGN KEY ("propposal_id") REFERENCES "Proposal"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proposal_to_team_member" ADD CONSTRAINT "proposal_to_team_member_team_member_id_TeamMember_name_fk" FOREIGN KEY ("team_member_id") REFERENCES "TeamMember"("name") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "category_to_proposal" ADD CONSTRAINT "category_to_proposal_category_name_proposal_id" PRIMARY KEY("category_name","proposal_id");--> statement-breakpoint
ALTER TABLE "proposal_to_team_member" ADD CONSTRAINT "proposal_to_team_member_propposal_id_team_member_id" PRIMARY KEY("propposal_id","team_member_id");