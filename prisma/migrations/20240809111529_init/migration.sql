/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_userId_key" ON "Profile"("id", "userId");
