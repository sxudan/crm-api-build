/*
  Warnings:

  - You are about to drop the column `address` on the `University` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "University" DROP COLUMN "address",
ADD COLUMN     "addresses" TEXT[];
