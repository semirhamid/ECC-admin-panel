-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sslFormId" INTEGER,
    "aftersaleId" INTEGER,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_file_sslForm" ON "File"("sslFormId");

-- CreateIndex
CREATE INDEX "idx_file_aftersale" ON "File"("aftersaleId");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_sslFormId_fkey" FOREIGN KEY ("sslFormId") REFERENCES "SSLForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_aftersaleId_fkey" FOREIGN KEY ("aftersaleId") REFERENCES "Aftersale"("id") ON DELETE SET NULL ON UPDATE CASCADE;
