/*
  Warnings:

  - Made the column `universityLongAddressId` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_universityLongAddressId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "universityLongAddressId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_universityLongAddressId_fkey" FOREIGN KEY ("universityLongAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
