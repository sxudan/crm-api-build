/*
  Warnings:

  - You are about to drop the column `courseUniversityId` on the `CourseUniversityIntake` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId,intakeId]` on the table `CourseUniversityIntake` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `CourseUniversityIntake` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseUniversityIntake" DROP CONSTRAINT "CourseUniversityIntake_courseUniversityId_fkey";

-- DropIndex
DROP INDEX "CourseUniversityIntake_courseUniversityId_intakeId_key";

-- AlterTable
ALTER TABLE "CourseUniversityIntake" DROP COLUMN "courseUniversityId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseUniversityIntake_courseId_intakeId_key" ON "CourseUniversityIntake"("courseId", "intakeId");

-- AddForeignKey
ALTER TABLE "CourseUniversityIntake" ADD CONSTRAINT "CourseUniversityIntake_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
