/*
  Warnings:

  - You are about to drop the column `prefferedCurrencyId` on the `Course` table. All the data in the column will be lost.

*/
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

-- AlterEnum
ALTER TYPE "LeadServices" ADD VALUE 'PSW';

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_prefferedCurrencyId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "prefferedCurrencyId",
ADD COLUMN     "currencyCode" TEXT;

-- AlterTable
ALTER TABLE "LanguageLead" ADD COLUMN     "bookingId" INTEGER,
ADD COLUMN     "classBookingId" INTEGER,
ADD COLUMN     "enrollmentDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "courseLevelId" INTEGER,
ADD COLUMN     "courseName" TEXT,
ADD COLUMN     "graduationYear" INTEGER,
ADD COLUMN     "lastCheckedIn" TIMESTAMP(3),
ADD COLUMN     "passportCountry" TEXT,
ADD COLUMN     "referredFrom" TEXT;

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
CREATE TABLE "ClassShift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClassShift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassBooking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "commencementDate" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "shiftName" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "receivedBy" TEXT NOT NULL,
    "instructorName" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "ClassBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClassShift_name_key" ON "ClassShift"("name");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_courseLevelId_fkey" FOREIGN KEY ("courseLevelId") REFERENCES "CourseLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_shiftName_fkey" FOREIGN KEY ("shiftName") REFERENCES "ClassShift"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageLead" ADD CONSTRAINT "LanguageLead_classBookingId_fkey" FOREIGN KEY ("classBookingId") REFERENCES "ClassBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
