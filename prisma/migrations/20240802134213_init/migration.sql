/*
  Warnings:

  - A unique constraint covering the columns `[requirementId]` on the table `University` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "University" DROP CONSTRAINT "University_requirementId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "University_requirementId_key" ON "University"("requirementId");

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "UniversityScholarshipRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
