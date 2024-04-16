/*
  Warnings:

  - You are about to drop the column `softwareVersion` on the `Aftersale` table. All the data in the column will be lost.
  - You are about to drop the column `hardwareWarranty` on the `Compliance` table. All the data in the column will be lost.
  - You are about to drop the column `installationWarranty` on the `Compliance` table. All the data in the column will be lost.
  - You are about to drop the column `passcode` on the `Compliance` table. All the data in the column will be lost.
  - You are about to drop the column `serviceMaintenanceContract` on the `Compliance` table. All the data in the column will be lost.
  - Added the required column `makeAndModel` to the `Compliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturerName` to the `Compliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aftersale" DROP COLUMN "softwareVersion",
ADD COLUMN     "hardwareWarranty" TIMESTAMP(3),
ADD COLUMN     "installationWarranty" TIMESTAMP(3),
ADD COLUMN     "payToChargeProvider" TEXT,
ADD COLUMN     "serviceMaintenanceContract" TIMESTAMP(3),
ADD COLUMN     "softwareProvider" TEXT,
ALTER COLUMN "installationAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Compliance" DROP COLUMN "hardwareWarranty",
DROP COLUMN "installationWarranty",
DROP COLUMN "passcode",
DROP COLUMN "serviceMaintenanceContract",
ADD COLUMN     "installationDate" TIMESTAMP(3),
ADD COLUMN     "makeAndModel" TEXT NOT NULL,
ADD COLUMN     "manufacturerName" TEXT NOT NULL,
ADD COLUMN     "softwareVersion" TEXT;
