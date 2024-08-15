/*
  Warnings:

  - You are about to drop the column `courseId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_courseId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "AddressCourse" (
    "addressId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "AddressCourse_pkey" PRIMARY KEY ("addressId","courseId")
);

-- AddForeignKey
ALTER TABLE "AddressCourse" ADD CONSTRAINT "AddressCourse_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressCourse" ADD CONSTRAINT "AddressCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
