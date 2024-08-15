/*
  Warnings:

  - You are about to drop the column `courseFieldId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseLevelId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseLevelId` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseFieldId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseLevelId_fkey";

-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_courseLevelId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseFieldId",
DROP COLUMN "courseLevelId",
ADD COLUMN     "courseField" TEXT,
ADD COLUMN     "courseLevel" TEXT;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "courseLevelId",
ADD COLUMN     "courseLevel" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dob",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phone",
ADD COLUMN     "username" TEXT;

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "experienceYears" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceProfile" (
    "id" SERIAL NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "ExperienceProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceProfile" (
    "id" SERIAL NOT NULL,
    "referenceId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "ReferenceProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "gender" "Gender",
    "nationality" TEXT,
    "passportNumber" TEXT,
    "passportExpiryDate" TIMESTAMP(3),
    "nationalIdNumber" TEXT,
    "emergencyContactName" TEXT,
    "relationshipToEmergencyContact" TEXT,
    "emergencyContactPhoneNumber" TEXT,
    "educationalBackgroundLevelOfEduction" TEXT,
    "educationalBackgroundNameOfInstitution" TEXT,
    "educationalBackgroundYearOfGraduation" INTEGER,
    "educationalBackgroundFieldOfStudy" TEXT,
    "employmentJobTitle" TEXT,
    "employmentDepartmend" TEXT,
    "employmentDateOfJoining" TIMESTAMP(3),
    "employmentEmployeeId" INTEGER,
    "socialLinkLinkedIn" TEXT,
    "socialLinkFacebook" TEXT,
    "socialLinkOther" TEXT,
    "travelHistory" BOOLEAN,
    "travelHistoryPurpose" TEXT,
    "travelHistoryCountry" TEXT,
    "travelHistoryYear" INTEGER,
    "interests" TEXT[],
    "volunteerExperience" BOOLEAN,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceProfile_experienceId_profileId_key" ON "ExperienceProfile"("experienceId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceProfile_referenceId_profileId_key" ON "ReferenceProfile"("referenceId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "ExperienceProfile" ADD CONSTRAINT "ExperienceProfile_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceProfile" ADD CONSTRAINT "ExperienceProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceProfile" ADD CONSTRAINT "ReferenceProfile_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "Reference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferenceProfile" ADD CONSTRAINT "ReferenceProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
