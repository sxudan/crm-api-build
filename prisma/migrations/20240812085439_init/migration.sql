/*
  Warnings:

  - You are about to drop the column `employmentDepartmend` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "employmentDepartmend",
ADD COLUMN     "employmentDepartment" TEXT;
