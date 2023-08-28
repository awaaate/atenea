-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "draft" JSONB,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
