/*
  Warnings:

  - Changed the type of `startDate` on the `Intake` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endDate` on the `Intake` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Intake" DROP COLUMN "startDate",
ADD COLUMN     "startDate" INTEGER NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" INTEGER NOT NULL;
