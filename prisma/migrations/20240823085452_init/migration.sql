-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Single', 'Married');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "accompanying" BOOLEAN,
ADD COLUMN     "emergencyContactEmail" TEXT,
ADD COLUMN     "emergencyContactName" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyContactRelation" TEXT,
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "maritalStatus" "MaritalStatus",
ADD COLUMN     "preferredCommunicationMethod" TEXT,
ADD COLUMN     "previousCourseName" TEXT,
ADD COLUMN     "previousHighestEducationLevel" TEXT,
ADD COLUMN     "previousLanguageOtherTestType" TEXT,
ADD COLUMN     "previousLanguageScore" TEXT,
ADD COLUMN     "previousLanguageTestType" TEXT,
ADD COLUMN     "previousOverallScore" TEXT,
ADD COLUMN     "previousYearOfGraduation" INTEGER,
ADD COLUMN     "spouseDob" TIMESTAMP(3),
ADD COLUMN     "spouseFullName" TEXT,
ADD COLUMN     "spouseHighestEducationLevel" TEXT;
