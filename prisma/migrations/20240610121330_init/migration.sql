/*
  Warnings:

  - You are about to drop the `CourseUniversity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `universityId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseUniversity" DROP CONSTRAINT "CourseUniversity_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUniversity" DROP CONSTRAINT "CourseUniversity_universityId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUniversityIntake" DROP CONSTRAINT "CourseUniversityIntake_courseUniversityId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "universityId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CourseUniversity";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUniversityIntake" ADD CONSTRAINT "CourseUniversityIntake_courseUniversityId_fkey" FOREIGN KEY ("courseUniversityId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
