-- CreateEnum
CREATE TYPE "LeadServices" AS ENUM ('TestPreparation', 'TestBooking', 'Counseling', 'Documentation', 'OHSC', 'VirtualCounseling', 'VisitVisa', 'Others');

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "service" "LeadServices";
