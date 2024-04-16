-- CreateTable
CREATE TABLE "SSLForm" (
    "id" SERIAL NOT NULL,
    "createdById" INTEGER NOT NULL,
    "assignedToId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "address3" TEXT NOT NULL,
    "address4" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "noAcPoints" INTEGER NOT NULL,
    "noDcPoints" INTEGER NOT NULL,
    "makeOfChargePoint" TEXT NOT NULL,
    "ampsPerCp" TEXT NOT NULL,
    "kwPerCp" TEXT NOT NULL,
    "wallMountSingle" INTEGER NOT NULL,
    "wallMountDual" INTEGER NOT NULL,
    "floorMountSingle" INTEGER NOT NULL,
    "floorMountDual" INTEGER NOT NULL,
    "phaseType" TEXT NOT NULL,
    "mainsFuseSize" TEXT NOT NULL,
    "mainsIsolation" TEXT NOT NULL,
    "earthingSetup" TEXT NOT NULL,
    "mobileSignal" TEXT NOT NULL,
    "signalStrength" TEXT NOT NULL,
    "consumerUnitMake" TEXT NOT NULL,
    "consumerUnitModel" TEXT NOT NULL,
    "totalSpareWays" TEXT NOT NULL,
    "totalAmpsInUse" TEXT NOT NULL,
    "cableSizeRead" TEXT NOT NULL,
    "cableLengthTotal" TEXT NOT NULL,
    "totalCableRuns" TEXT NOT NULL,
    "internalCableAttachment" TEXT NOT NULL,
    "dataCableRun" TEXT NOT NULL,
    "cableRunDescription" TEXT NOT NULL,
    "selectOptions" TEXT NOT NULL,
    "gwLength" TEXT NOT NULL,
    "gwWidth" TEXT NOT NULL,
    "gwDepth" TEXT NOT NULL,
    "ductingSize" TEXT NOT NULL,
    "ductingLength" TEXT NOT NULL,
    "groundWorksDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SSLForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SSLForm" ADD CONSTRAINT "SSLForm_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SSLForm" ADD CONSTRAINT "SSLForm_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
