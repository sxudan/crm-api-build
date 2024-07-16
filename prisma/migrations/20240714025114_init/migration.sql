/*
  Warnings:

  - You are about to drop the column `intakeId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the `CourseUniversityIntake` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Intake` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `intake` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_intakeId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUniversityIntake" DROP CONSTRAINT "CourseUniversityIntake_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUniversityIntake" DROP CONSTRAINT "CourseUniversityIntake_intakeId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "intakeId",
ADD COLUMN     "intake" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "intakes" INTEGER[];

-- DropTable
DROP TABLE "CourseUniversityIntake";

-- DropTable
DROP TABLE "Intake";
