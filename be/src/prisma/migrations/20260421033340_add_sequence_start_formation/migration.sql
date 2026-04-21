/*
  Warnings:

  - Added the required column `startFormationId` to the `sequence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sequence" ADD COLUMN     "isValid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startFormationId" INTEGER NOT NULL,
ADD COLUMN     "variantGroupId" TEXT;

-- CreateIndex
CREATE INDEX "sequence_variantGroupId_idx" ON "sequence"("variantGroupId");

-- AddForeignKey
ALTER TABLE "sequence" ADD CONSTRAINT "sequence_startFormationId_fkey" FOREIGN KEY ("startFormationId") REFERENCES "formation"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;
