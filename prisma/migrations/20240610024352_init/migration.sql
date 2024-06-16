-- CreateTable
CREATE TABLE "Intake" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "courseUniversityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Intake_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Intake" ADD CONSTRAINT "Intake_courseUniversityId_fkey" FOREIGN KEY ("courseUniversityId") REFERENCES "CourseUniversity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
