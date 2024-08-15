-- AlterTable
ALTER TABLE "University" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "contactPersonEmail" TEXT,
ADD COLUMN     "contactPersonJobTitle" TEXT,
ADD COLUMN     "contactPersonName" TEXT,
ADD COLUMN     "contactPersonPhoneNumber" TEXT,
ADD COLUMN     "requirementId" INTEGER,
ADD COLUMN     "websiteUrl" TEXT;

-- CreateTable
CREATE TABLE "UniversityScholarshipRequirement" (
    "id" SERIAL NOT NULL,
    "academicRequirement" TEXT,
    "ieltsRequirement" TEXT,
    "pteRequirement" TEXT,
    "toeflRequirement" TEXT,
    "scholarshipRequirement" TEXT,
    "comments" TEXT,

    CONSTRAINT "UniversityScholarshipRequirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "UniversityScholarshipRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
