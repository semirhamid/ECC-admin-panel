/*
  Warnings:

  - You are about to drop the column `accountStatus` on the `Compliance` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Compliance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Compliance" DROP COLUMN "accountStatus",
DROP COLUMN "role";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
