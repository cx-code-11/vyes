-- CreateEnum
CREATE TYPE "VendorRegistrationStatus" AS ENUM ('Pending', 'Reviewed', 'Approved', 'Rejected');

-- CreateTable
CREATE TABLE "VendorRegistrationRequest" (
    "id" TEXT NOT NULL,
    "uiId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "status" "VendorRegistrationStatus" NOT NULL DEFAULT 'Pending',
    "businessName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "upiId" TEXT NOT NULL,
    "gstNumber" TEXT,
    "aadhar" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "aadhaarUrl" TEXT,
    "panUrl" TEXT,
    "gstUrl" TEXT,
    "agreementUrl" TEXT,

    CONSTRAINT "VendorRegistrationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorRegistrationRequest_uiId_key" ON "VendorRegistrationRequest"("uiId");
