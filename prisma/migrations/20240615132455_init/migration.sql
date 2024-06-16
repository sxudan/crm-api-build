/*
  Warnings:

  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.
  - Added the required column `visaStatusId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "visaStatusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_visaStatusId_fkey" FOREIGN KEY ("visaStatusId") REFERENCES "VisaStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
