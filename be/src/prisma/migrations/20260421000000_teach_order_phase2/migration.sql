-- DropForeignKey
ALTER TABLE "teach_order_entry" DROP CONSTRAINT "teach_order_entry_callId_startId_fkey";

-- DropIndex
DROP INDEX "teach_order_entry_teachOrderId_position_idx";

-- AlterTable
ALTER TABLE "program" ADD COLUMN     "abbreviation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teach_order_entry" DROP CONSTRAINT "teach_order_entry_pkey",
ADD COLUMN     "entryType" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "sortOrder" INTEGER NOT NULL,
ADD COLUMN     "subPosition" TEXT,
ALTER COLUMN "callId" DROP NOT NULL,
ALTER COLUMN "startId" DROP NOT NULL,
ALTER COLUMN "week" DROP NOT NULL,
ADD CONSTRAINT "teach_order_entry_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "program_call_formation" (
    "programId" INTEGER NOT NULL,
    "callId" INTEGER NOT NULL,
    "startId" INTEGER NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "program_call_formation_pkey" PRIMARY KEY ("programId","callId","startId")
);

-- CreateIndex
CREATE INDEX "program_call_formation_programId_difficulty_idx" ON "program_call_formation"("programId", "difficulty");

-- CreateIndex
CREATE UNIQUE INDEX "program_abbreviation_key" ON "program"("abbreviation");

-- CreateIndex
CREATE INDEX "teach_order_entry_teachOrderId_position_subPosition_idx" ON "teach_order_entry"("teachOrderId", "position", "subPosition");

-- CreateIndex
CREATE UNIQUE INDEX "teach_order_entry_teachOrderId_sortOrder_key" ON "teach_order_entry"("teachOrderId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "teach_order_entry_teachOrderId_callId_startId_key" ON "teach_order_entry"("teachOrderId", "callId", "startId");

-- AddForeignKey
ALTER TABLE "program_call_formation" ADD CONSTRAINT "program_call_formation_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("programId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "program_call_formation" ADD CONSTRAINT "program_call_formation_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order_entry" ADD CONSTRAINT "teach_order_entry_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE SET NULL ON UPDATE CASCADE;
