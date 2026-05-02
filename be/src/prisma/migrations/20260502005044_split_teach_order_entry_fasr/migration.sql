-- DropForeignKey
ALTER TABLE "teach_order_entry" DROP CONSTRAINT "teach_order_entry_callId_startId_fkey";

-- DropIndex
DROP INDEX "teach_order_entry_teachOrderId_callId_startId_key";

-- DropIndex
DROP INDEX "teach_order_entry_teachOrderId_position_subPosition_idx";

-- DropIndex
DROP INDEX "teach_order_entry_teachOrderId_sortOrder_key";

-- AlterTable
ALTER TABLE "sequence" DROP COLUMN "safeAfterPosition",
ADD COLUMN     "safeAfterEntryOrder" INTEGER,
ADD COLUMN     "safeAfterFasrOrder" INTEGER;

-- AlterTable
ALTER TABLE "teach_order_entry" DROP CONSTRAINT "teach_order_entry_pkey",
DROP COLUMN "id",
DROP COLUMN "position",
DROP COLUMN "sortOrder",
DROP COLUMN "startId",
DROP COLUMN "subPosition",
ADD COLUMN     "displayOrder" TEXT NOT NULL,
ADD COLUMN     "entryOrder" INTEGER NOT NULL,
ADD COLUMN     "familyId" INTEGER,
ADD CONSTRAINT "teach_order_entry_pkey" PRIMARY KEY ("teachOrderId", "entryOrder");

-- CreateTable
CREATE TABLE "teach_order_entry_fasr" (
    "teachOrderId" INTEGER NOT NULL,
    "entryOrder" INTEGER NOT NULL,
    "fasrOrder" INTEGER NOT NULL,
    "callId" INTEGER NOT NULL,
    "startId" INTEGER NOT NULL,

    CONSTRAINT "teach_order_entry_fasr_pkey" PRIMARY KEY ("teachOrderId","entryOrder","fasrOrder")
);

-- CreateIndex
CREATE INDEX "teach_order_entry_fasr_callId_startId_idx" ON "teach_order_entry_fasr"("callId", "startId");

-- CreateIndex
CREATE UNIQUE INDEX "teach_order_entry_fasr_teachOrderId_entryOrder_callId_start_key" ON "teach_order_entry_fasr"("teachOrderId", "entryOrder", "callId", "startId");

-- CreateIndex
CREATE UNIQUE INDEX "teach_order_entry_teachOrderId_displayOrder_key" ON "teach_order_entry"("teachOrderId", "displayOrder");

-- AddForeignKey
ALTER TABLE "teach_order_entry" ADD CONSTRAINT "teach_order_entry_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "call_family"("familyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order_entry" ADD CONSTRAINT "teach_order_entry_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("callId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order_entry_fasr" ADD CONSTRAINT "teach_order_entry_fasr_teachOrderId_entryOrder_fkey" FOREIGN KEY ("teachOrderId", "entryOrder") REFERENCES "teach_order_entry"("teachOrderId", "entryOrder") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order_entry_fasr" ADD CONSTRAINT "teach_order_entry_fasr_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE RESTRICT ON UPDATE CASCADE;
