/*
  Warnings:

  - A unique constraint covering the columns `[applicationId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[leadId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "applicationId" INTEGER,
ADD COLUMN     "leadId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Task_applicationId_key" ON "Task"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_leadId_key" ON "Task"("leadId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
