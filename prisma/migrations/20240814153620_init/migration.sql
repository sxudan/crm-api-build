/*
  Warnings:

  - You are about to drop the `ClassShift` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassBooking" DROP CONSTRAINT "ClassBooking_shiftName_fkey";

-- AlterTable
ALTER TABLE "ClassBooking" ADD COLUMN     "shift" TEXT;

-- DropTable
DROP TABLE "ClassShift";
