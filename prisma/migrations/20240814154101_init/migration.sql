/*
  Warnings:

  - You are about to drop the column `instructorName` on the `ClassBooking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClassBooking" DROP COLUMN "instructorName",
ADD COLUMN     "instructorId" INTEGER;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
