/*
  Warnings:

  - Added the required column `intake` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "intake" TIMESTAMP(3) NOT NULL;
