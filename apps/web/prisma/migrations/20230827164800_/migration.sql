-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "accentColor" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
