-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "annualTuitionFees" DOUBLE PRECISION,
ADD COLUMN     "courseFieldId" INTEGER,
ADD COLUMN     "courseLevelId" INTEGER,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "prefferedCurrencyId" INTEGER,
ADD COLUMN     "requirementId" INTEGER;

-- AlterTable
ALTER TABLE "UniversityScholarshipRequirement" ADD COLUMN     "otherRequirement" TEXT;

-- CreateTable
CREATE TABLE "CourseField" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "CourseField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "CourseLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseFieldId_fkey" FOREIGN KEY ("courseFieldId") REFERENCES "CourseField"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseLevelId_fkey" FOREIGN KEY ("courseLevelId") REFERENCES "CourseLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_prefferedCurrencyId_fkey" FOREIGN KEY ("prefferedCurrencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "UniversityScholarshipRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
