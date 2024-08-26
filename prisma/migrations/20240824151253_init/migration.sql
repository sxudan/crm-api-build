/*
  Warnings:

  - A unique constraint covering the columns `[currencyCode]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "currencyCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Country_currencyCode_key" ON "Country"("currencyCode");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_currencyCode_fkey" FOREIGN KEY ("currencyCode") REFERENCES "Currency"("code") ON DELETE SET NULL ON UPDATE CASCADE;
