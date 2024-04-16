-- AlterTable
ALTER TABLE "Compliance" ADD COLUMN     "accountStatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "PushToken" ADD COLUMN     "enablePushNotification" BOOLEAN NOT NULL DEFAULT true;
