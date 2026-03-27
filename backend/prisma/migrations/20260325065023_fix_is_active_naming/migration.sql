/*
  Warnings:

  - You are about to drop the column `isactive` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `isactive` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `isactive` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `isactive` on the `ServiceCategory` table. All the data in the column will be lost.
  - You are about to drop the column `isactive` on the `ServiceMode` table. All the data in the column will be lost.
  - You are about to drop the column `isactive` on the `ServiceModeStep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "isactive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "isactive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "isactive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ServiceCategory" DROP COLUMN "isactive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ServiceMode" DROP COLUMN "isactive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ServiceModeStep" DROP COLUMN "isactive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
