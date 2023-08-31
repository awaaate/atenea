-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('expired', 'invalid', 'valid', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('verified', 'unverified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('webauthn', 'totp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal3', 'aal2', 'aal1');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('plain', 's256');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Proposal" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"coverImage" text,
	"content" text NOT NULL,
	"budgetTotal" integer NOT NULL,
	"projectId" integer,
	"revised" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RoadmapSection" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"proposalId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SocialHandle" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"teamMemberName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TeamMember" (
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text PRIMARY KEY NOT NULL,
	"what" text DEFAULT '' NOT NULL,
	"walletAddress" text DEFAULT '' NOT NULL,
	"socialHandles" json DEFAULT '[]'::json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BudgetSection" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"amount" integer NOT NULL,
	"proposalId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category_to_proposal" (
	"category_name" text NOT NULL,
	"proposal_id" integer NOT NULL,
	CONSTRAINT category_to_proposal_category_name_proposal_id PRIMARY KEY("category_name","proposal_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proposal_to_team_member" (
	"propposal_id" integer NOT NULL,
	"team_member_id" text NOT NULL,
	CONSTRAINT proposal_to_team_member_propposal_id_team_member_id PRIMARY KEY("propposal_id","team_member_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "TeamMember_name_key" ON "TeamMember" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RoadmapSection" ADD CONSTRAINT "RoadmapSection_proposalId_Proposal_id_fk" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BudgetSection" ADD CONSTRAINT "BudgetSection_proposalId_Proposal_id_fk" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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

*/