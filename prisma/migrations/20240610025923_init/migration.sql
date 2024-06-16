/*
  Warnings:

  - You are about to drop the column `courseUniversityId` on the `Intake` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Intake" DROP CONSTRAINT "Intake_courseUniversityId_fkey";

-- AlterTable
ALTER TABLE "Intake" DROP COLUMN "courseUniversityId";

-- CreateTable
CREATE TABLE "CourseUniversityIntake" (
    "id" SERIAL NOT NULL,
    "courseUniversityId" INTEGER NOT NULL,
    "intakeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseUniversityIntake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseUniversityIntake_courseUniversityId_intakeId_key" ON "CourseUniversityIntake"("courseUniversityId", "intakeId");

-- AddForeignKey
ALTER TABLE "CourseUniversityIntake" ADD CONSTRAINT "CourseUniversityIntake_courseUniversityId_fkey" FOREIGN KEY ("courseUniversityId") REFERENCES "CourseUniversity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUniversityIntake" ADD CONSTRAINT "CourseUniversityIntake_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "Intake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
