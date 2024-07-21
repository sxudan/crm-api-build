-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "toTransferToLanguage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transferredToLanguage" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "transferToLanguage" DROP NOT NULL,
ALTER COLUMN "transferToLanguage" DROP DEFAULT;
