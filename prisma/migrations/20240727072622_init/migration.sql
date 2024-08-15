/*
  Warnings:

  - A unique constraint covering the columns `[universityLongAddressId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "universityLongAddressId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Application_universityLongAddressId_key" ON "Application"("universityLongAddressId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_universityLongAddressId_fkey" FOREIGN KEY ("universityLongAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
