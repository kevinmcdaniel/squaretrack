/*
  Warnings:

  - The primary key for the `sequence_calls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `type` to the `sequence_calls` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sequence_calls" DROP CONSTRAINT "sequence_calls_callId_fkey";

-- DropForeignKey
ALTER TABLE "sequence_calls" DROP CONSTRAINT "sequence_calls_startId_fkey";

-- AlterTable
ALTER TABLE "call" ADD COLUMN     "preferredDisplay" TEXT,
ADD COLUMN     "sdSeq" TEXT;

-- AlterTable
ALTER TABLE "call_formation" ADD COLUMN     "inFlowDirection" TEXT,
ADD COLUMN     "inFlowRotation" TEXT,
ADD COLUMN     "outFlowDirection" TEXT,
ADD COLUMN     "outFlowRotation" TEXT;

-- AlterTable
ALTER TABLE "sequence" ADD COLUMN     "activator" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "rating" TEXT,
ADD COLUMN     "safeAfterPosition" INTEGER,
ADD COLUMN     "sourceText" TEXT,
ADD COLUMN     "teachOrderId" INTEGER;

-- AlterTable
ALTER TABLE "sequence_calls" DROP CONSTRAINT "sequence_calls_pkey",
ADD COLUMN     "count" INTEGER,
ADD COLUMN     "designator" TEXT,
ADD COLUMN     "text" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "callId" DROP NOT NULL,
ALTER COLUMN "startId" DROP NOT NULL,
ADD CONSTRAINT "sequence_calls_pkey" PRIMARY KEY ("seqId", "order");

-- CreateTable
CREATE TABLE "call_synonym" (
    "id" SERIAL NOT NULL,
    "callId" INTEGER NOT NULL,
    "alias" TEXT NOT NULL,

    CONSTRAINT "call_synonym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teach_order" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "teach_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teach_order_entry" (
    "teachOrderId" INTEGER NOT NULL,
    "callId" INTEGER NOT NULL,
    "startId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,

    CONSTRAINT "teach_order_entry_pkey" PRIMARY KEY ("teachOrderId","callId","startId")
);

-- CreateIndex
CREATE UNIQUE INDEX "call_synonym_alias_key" ON "call_synonym"("alias");

-- CreateIndex
CREATE INDEX "teach_order_entry_teachOrderId_position_idx" ON "teach_order_entry"("teachOrderId", "position");

-- CreateIndex
CREATE INDEX "teach_order_entry_teachOrderId_week_idx" ON "teach_order_entry"("teachOrderId", "week");

-- AddForeignKey
ALTER TABLE "call_synonym" ADD CONSTRAINT "call_synonym_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("callId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order" ADD CONSTRAINT "teach_order_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("programId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order_entry" ADD CONSTRAINT "teach_order_entry_teachOrderId_fkey" FOREIGN KEY ("teachOrderId") REFERENCES "teach_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teach_order_entry" ADD CONSTRAINT "teach_order_entry_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sequence" ADD CONSTRAINT "sequence_teachOrderId_fkey" FOREIGN KEY ("teachOrderId") REFERENCES "teach_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sequence_calls" ADD CONSTRAINT "sequence_calls_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE SET NULL ON UPDATE CASCADE;
