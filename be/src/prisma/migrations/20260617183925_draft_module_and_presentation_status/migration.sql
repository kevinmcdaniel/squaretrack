-- DropForeignKey
ALTER TABLE "choreo_module" DROP CONSTRAINT "choreo_module_endFormId_fkey";

-- DropForeignKey
ALTER TABLE "choreo_module" DROP CONSTRAINT "choreo_module_startFormId_fkey";

-- DropForeignKey
ALTER TABLE "choreo_module_step" DROP CONSTRAINT "choreo_module_step_callId_startId_fkey";

-- AlterTable
ALTER TABLE "choreo_module" ALTER COLUMN "startFormId" DROP NOT NULL,
ALTER COLUMN "endFormId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "choreo_module_step" ALTER COLUMN "callId" DROP NOT NULL,
ALTER COLUMN "startId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "presentation" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';

-- AddForeignKey
ALTER TABLE "choreo_module" ADD CONSTRAINT "choreo_module_startFormId_fkey" FOREIGN KEY ("startFormId") REFERENCES "formation"("formId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choreo_module" ADD CONSTRAINT "choreo_module_endFormId_fkey" FOREIGN KEY ("endFormId") REFERENCES "formation"("formId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choreo_module_step" ADD CONSTRAINT "choreo_module_step_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE SET NULL ON UPDATE CASCADE;
