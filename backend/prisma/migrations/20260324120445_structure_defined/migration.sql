-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('QuoteRequested', 'QuoteProvided', 'AssigningVendor', 'VendorAssigned', 'InProgress', 'Completed', 'Cancelled');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('credit', 'debit');

-- CreateEnum
CREATE TYPE "TransactionTo" AS ENUM ('vyess', 'vendor', 'employee', 'customer');

-- CreateEnum
CREATE TYPE "TransactionFor" AS ENUM ('customerPayment', 'vendorPayout', 'employeeSalary', 'refund');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('cash', 'card', 'upi', 'netbanking', 'wallet');

-- CreateEnum
CREATE TYPE "AccountFor" AS ENUM ('vendor', 'customer', 'admin', 'employee');

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "uiId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "businessName" TEXT NOT NULL,
    "representativeName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mapUrl" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "logoUrl" TEXT,
    "employeeCount" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorService" (
    "id" TEXT NOT NULL,
    "vendorIdFk" TEXT NOT NULL,
    "serviceModeIdFk" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "experienceYears" INTEGER,

    CONSTRAINT "VendorService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" TEXT NOT NULL,
    "vendorIdFk" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "uiId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mapUrl" TEXT,
    "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "customerIdFk" TEXT NOT NULL,
    "serviceIdFk" TEXT NOT NULL,
    "serviceModeIdFk" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "uiId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "employeeUiId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "aadharImgUrl" TEXT,
    "myphotoImgUrl" TEXT,
    "salary" DOUBLE PRECISION NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "uiId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "adminUiId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "aadharImgUrl" TEXT,
    "myphotoImgUrl" TEXT,
    "salary" DOUBLE PRECISION NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "uiId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "serviceIdFk" TEXT NOT NULL,
    "vendorIdFk" TEXT,
    "customerIdFk" TEXT NOT NULL,
    "offerIdFk" TEXT,
    "couponIdFk" TEXT,
    "serviceTime" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "imgVideoUrl" TEXT,
    "amount" DOUBLE PRECISION,
    "orderStatus" "OrderStatus" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "imgVideoUrl" TEXT,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT,
    "serviceCategoryIdFk" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMode" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "what" TEXT NOT NULL,
    "why" TEXT NOT NULL,
    "best" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "serviceIdFk" TEXT NOT NULL,
    "offerIdFk" TEXT,

    CONSTRAINT "ServiceMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceModeStep" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT,
    "serviceModeIdFk" TEXT NOT NULL,

    CONSTRAINT "ServiceModeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "assigntoFk" TEXT,
    "minValue" INTEGER NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" TIMESTAMP(3),
    "updated" TIMESTAMP(3) NOT NULL,
    "updatedByFk" TEXT NOT NULL,
    "orderIdFk" TEXT,
    "customerIdFk" TEXT,
    "vendorIdFk" TEXT,
    "employeeIdFk" TEXT,
    "adminIdFk" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "transactionTo" "TransactionTo" NOT NULL,
    "transactionFor" "TransactionFor",
    "mode" "PaymentMode" NOT NULL,
    "transactionId" TEXT,
    "status" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "accountFor" "AccountFor" NOT NULL,
    "vendorIdFk" TEXT,
    "customerIdFk" TEXT,
    "adminIdFk" TEXT,
    "employeeIdFk" TEXT,
    "accountNumber" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "upi" TEXT NOT NULL,
    "qrImgUrl" TEXT,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT,
    "description" TEXT,
    "uploadedById" TEXT NOT NULL,
    "sharedWithId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "receiverType" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "isread" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatedServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RelatedServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_uiId_key" ON "Vendor"("uiId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorService_vendorIdFk_serviceModeIdFk_key" ON "VendorService"("vendorIdFk", "serviceModeIdFk");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_uiId_key" ON "Customer"("uiId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_uiId_key" ON "Employee"("uiId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeUiId_key" ON "Employee"("employeeUiId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_uiId_key" ON "Admin"("uiId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminUiId_key" ON "Admin"("adminUiId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_uiId_key" ON "Order"("uiId");

-- CreateIndex
CREATE INDEX "_RelatedServices_B_index" ON "_RelatedServices"("B");

-- AddForeignKey
ALTER TABLE "VendorService" ADD CONSTRAINT "VendorService_vendorIdFk_fkey" FOREIGN KEY ("vendorIdFk") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorService" ADD CONSTRAINT "VendorService_serviceModeIdFk_fkey" FOREIGN KEY ("serviceModeIdFk") REFERENCES "ServiceMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_vendorIdFk_fkey" FOREIGN KEY ("vendorIdFk") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerIdFk_fkey" FOREIGN KEY ("customerIdFk") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_serviceIdFk_fkey" FOREIGN KEY ("serviceIdFk") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_serviceModeIdFk_fkey" FOREIGN KEY ("serviceModeIdFk") REFERENCES "ServiceMode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceIdFk_fkey" FOREIGN KEY ("serviceIdFk") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_vendorIdFk_fkey" FOREIGN KEY ("vendorIdFk") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerIdFk_fkey" FOREIGN KEY ("customerIdFk") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceCategoryIdFk_fkey" FOREIGN KEY ("serviceCategoryIdFk") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMode" ADD CONSTRAINT "ServiceMode_serviceIdFk_fkey" FOREIGN KEY ("serviceIdFk") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMode" ADD CONSTRAINT "ServiceMode_offerIdFk_fkey" FOREIGN KEY ("offerIdFk") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceModeStep" ADD CONSTRAINT "ServiceModeStep_serviceModeIdFk_fkey" FOREIGN KEY ("serviceModeIdFk") REFERENCES "ServiceMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_assigntoFk_fkey" FOREIGN KEY ("assigntoFk") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderIdFk_fkey" FOREIGN KEY ("orderIdFk") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customerIdFk_fkey" FOREIGN KEY ("customerIdFk") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_vendorIdFk_fkey" FOREIGN KEY ("vendorIdFk") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_employeeIdFk_fkey" FOREIGN KEY ("employeeIdFk") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_adminIdFk_fkey" FOREIGN KEY ("adminIdFk") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_vendorIdFk_fkey" FOREIGN KEY ("vendorIdFk") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_customerIdFk_fkey" FOREIGN KEY ("customerIdFk") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_adminIdFk_fkey" FOREIGN KEY ("adminIdFk") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_employeeIdFk_fkey" FOREIGN KEY ("employeeIdFk") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedServices" ADD CONSTRAINT "_RelatedServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedServices" ADD CONSTRAINT "_RelatedServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
