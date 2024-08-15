/*
  Warnings:

  - You are about to drop the column `addressId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "courseId" INTEGER;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "addressId";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
