-- CreateTable
CREATE TABLE "VisaStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "VisaStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisaStatus" ADD CONSTRAINT "VisaStatus_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
