-- CreateTable
CREATE TABLE "Aftersale" (
    "id" SERIAL NOT NULL,
    "createdById" INTEGER NOT NULL,
    "assignedToId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "clientDetail" TEXT NOT NULL,
    "manufacturerName" TEXT NOT NULL,
    "eccJobReference" TEXT NOT NULL,
    "makeAndModel" TEXT NOT NULL,
    "installationAddress" TEXT NOT NULL,
    "softwareVersion" TEXT NOT NULL,

    CONSTRAINT "Aftersale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compliance" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "compliant" BOOLEAN NOT NULL,
    "hardwareWarranty" TIMESTAMP(3) NOT NULL,
    "serviceMaintenanceContract" TIMESTAMP(3) NOT NULL,
    "installationWarranty" TIMESTAMP(3) NOT NULL,
    "passcode" TEXT NOT NULL,
    "chargePointLocation" TEXT NOT NULL,
    "aftersaleId" INTEGER NOT NULL,

    CONSTRAINT "Compliance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_aftersale_createdBy" ON "Aftersale"("createdById");

-- CreateIndex
CREATE INDEX "idx_aftersale_assignedTo" ON "Aftersale"("assignedToId");

-- CreateIndex
CREATE INDEX "idx_compliance_aftersale" ON "Compliance"("aftersaleId");

-- AddForeignKey
ALTER TABLE "Aftersale" ADD CONSTRAINT "Aftersale_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aftersale" ADD CONSTRAINT "Aftersale_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compliance" ADD CONSTRAINT "Compliance_aftersaleId_fkey" FOREIGN KEY ("aftersaleId") REFERENCES "Aftersale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
