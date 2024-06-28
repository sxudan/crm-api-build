/*
  Warnings:

  - You are about to drop the column `intake` on the `Application` table. All the data in the column will be lost.
  - Added the required column `archived` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intakeId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportCountry` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referer` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "intake",
ADD COLUMN     "archived" BOOLEAN NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "intakeId" INTEGER NOT NULL,
ADD COLUMN     "passportCountry" TEXT NOT NULL,
ADD COLUMN     "referer" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "Intake"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
