-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others');

-- CreateEnum
CREATE TYPE "LeadServices" AS ENUM ('TestPreparation', 'TestBooking', 'Counseling', 'Documentation', 'OHSC', 'VirtualCounseling', 'VisitVisa', 'PSW', 'Others');

-- CreateEnum
CREATE TYPE "Features" AS ENUM ('Instituition', 'Course', 'Lead', 'Language', 'Application', 'Task', 'User', 'Country', 'SubAgent', 'Auth');

-- CreateEnum
CREATE TYPE "Event" AS ENUM ('Create', 'Update', 'Delete');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'UnPaid', 'PartiallyPaid');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('Cash', 'Online');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Pending', 'Booked', 'Refunded');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('High', 'Medium', 'Low');

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityScholarshipRequirement" (
    "id" SERIAL NOT NULL,
    "academicRequirement" TEXT,
    "ieltsRequirement" TEXT,
    "pteRequirement" TEXT,
    "toeflRequirement" TEXT,
    "scholarshipRequirement" TEXT,
    "otherRequirement" TEXT,
    "comments" TEXT,

    CONSTRAINT "UniversityScholarshipRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addresses" TEXT[],
    "countryId" INTEGER NOT NULL,
    "direct" BOOLEAN NOT NULL,
    "websiteUrl" TEXT,
    "requirementId" INTEGER,
    "contactPersonName" TEXT,
    "contactPersonJobTitle" TEXT,
    "contactPersonEmail" TEXT,
    "contactPersonPhoneNumber" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "description" TEXT,
    "courseField" TEXT,
    "courseLevel" TEXT,
    "intakes" INTEGER[],
    "duration" INTEGER,
    "annualTuitionFees" DOUBLE PRECISION,
    "currencyCode" TEXT,
    "requirementId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressCourse" (
    "addressId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "AddressCourse_pkey" PRIMARY KEY ("addressId","courseId")
);

-- CreateTable
CREATE TABLE "VisaStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "VisaStatus_pkey" PRIMARY KEY ("id")
);

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
    "roleId" INTEGER NOT NULL,
    "branchId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "Gender",
    "nationality" TEXT,
    "passportNumber" TEXT,
    "passportExpiryDate" TIMESTAMP(3),
    "nationalIdNumber" TEXT,
    "emergencyContactName" TEXT,
    "relationshipToEmergencyContact" TEXT,
    "emergencyContactPhoneNumber" TEXT,
    "educationalBackgroundCourse" TEXT,
    "educationalBackgroundLevelOfEduction" TEXT,
    "educationalBackgroundNameOfInstitution" TEXT,
    "educationalBackgroundYearOfGraduation" INTEGER,
    "educationalBackgroundFieldOfStudy" TEXT,
    "employmentJobTitle" TEXT,
    "employmentDepartment" TEXT,
    "employmentDateOfJoining" TIMESTAMP(3),
    "employmentEmployeeId" TEXT,
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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street1" TEXT NOT NULL,
    "street2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalcode" TEXT NOT NULL,
    "universityId" INTEGER,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "event" "Event" NOT NULL,
    "feature" "Features" NOT NULL,
    "externalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryId" INTEGER,
    "courseName" TEXT,
    "graduationYear" INTEGER,
    "referredFrom" TEXT,
    "courseLevel" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "priority" "Priority" NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "toConvert" BOOLEAN NOT NULL DEFAULT false,
    "toTransferToLanguage" BOOLEAN NOT NULL DEFAULT false,
    "transferredToLanguage" BOOLEAN NOT NULL DEFAULT false,
    "service" "LeadServices",
    "passportCountry" TEXT,
    "lastCheckedIn" TIMESTAMP(3),
    "dob" TIMESTAMP(3),

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LanguageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageAdmissionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LanguageAdmissionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bookedDate" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentMode" "PaymentMode" NOT NULL,
    "venue" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "receivedBy" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassBooking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "commencementDate" TIMESTAMP(3),
    "paymentStatus" "PaymentStatus" NOT NULL,
    "shift" TEXT,
    "currencyCode" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "receivedBy" TEXT NOT NULL,
    "instructorId" INTEGER,
    "comments" TEXT NOT NULL,

    CONSTRAINT "ClassBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageLead" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "languageTypeId" INTEGER NOT NULL,
    "addmissionTypeId" INTEGER NOT NULL,
    "enrollmentDate" TIMESTAMP(3),
    "bookingId" INTEGER,
    "classBookingId" INTEGER,

    CONSTRAINT "LanguageLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assignedToId" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationId" INTEGER,
    "leadId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "passportCountry" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "intake" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "universityId" INTEGER NOT NULL,
    "universityAddress" TEXT,
    "universityLongAddressId" INTEGER NOT NULL,
    "leadId" INTEGER,
    "visaStatusId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL,
    "isDirect" BOOLEAN NOT NULL,
    "referer" TEXT,
    "subAgentId" INTEGER,
    "converted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAgent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "SubAgent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "University_requirementId_key" ON "University"("requirementId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_code_key" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceProfile_experienceId_profileId_key" ON "ExperienceProfile"("experienceId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceProfile_referenceId_profileId_key" ON "ReferenceProfile"("referenceId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_userId_key" ON "Profile"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_addressId_key" ON "Branch"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "LanguageLead_leadId_key" ON "LanguageLead"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_applicationId_key" ON "Task"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_leadId_key" ON "Task"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_universityLongAddressId_key" ON "Application"("universityLongAddressId");

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "UniversityScholarshipRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "UniversityScholarshipRequirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressCourse" ADD CONSTRAINT "AddressCourse_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressCourse" ADD CONSTRAINT "AddressCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisaStatus" ADD CONSTRAINT "VisaStatus_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_languageTypeId_fkey" FOREIGN KEY ("languageTypeId") REFERENCES "LanguageType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_addmissionTypeId_fkey" FOREIGN KEY ("addmissionTypeId") REFERENCES "LanguageAdmissionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_classBookingId_fkey" FOREIGN KEY ("classBookingId") REFERENCES "ClassBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_universityLongAddressId_fkey" FOREIGN KEY ("universityLongAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_visaStatusId_fkey" FOREIGN KEY ("visaStatusId") REFERENCES "VisaStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_subAgentId_fkey" FOREIGN KEY ("subAgentId") REFERENCES "SubAgent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
