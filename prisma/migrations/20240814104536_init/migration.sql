-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_countryId_fkey";

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
