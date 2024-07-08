/*
  Warnings:

  - Made the column `direct` on table `University` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "University" ALTER COLUMN "direct" SET NOT NULL;
