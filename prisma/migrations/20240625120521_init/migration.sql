/*
  Warnings:

  - Added the required column `priority` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('High', 'Medium', 'Low');

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "priority" "Priority" NOT NULL;

-- DropEnum
DROP TYPE "ApplicationStatus";
