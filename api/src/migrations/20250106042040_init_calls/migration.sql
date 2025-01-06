/*
  Warnings:

  - The primary key for the `dance_group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `dancer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `dancer` table. All the data in the column will be lost.
  - You are about to drop the `dance_level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `level` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `dancerId` on the `dance_group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "dance_group" DROP CONSTRAINT "dance_group_dancerId_fkey";

-- DropForeignKey
ALTER TABLE "dance_level" DROP CONSTRAINT "dance_level_dancerId_fkey";

-- DropForeignKey
ALTER TABLE "dance_level" DROP CONSTRAINT "dance_level_levelId_fkey";

-- AlterTable
ALTER TABLE "dance_group" DROP CONSTRAINT "dance_group_pkey",
DROP COLUMN "dancerId",
ADD COLUMN     "dancerId" INTEGER NOT NULL,
ADD CONSTRAINT "dance_group_pkey" PRIMARY KEY ("dancerId", "groupId");

-- AlterTable
ALTER TABLE "dancer" DROP CONSTRAINT "dancer_pkey",
DROP COLUMN "id",
ADD COLUMN     "dancerId" SERIAL NOT NULL,
ADD CONSTRAINT "dancer_pkey" PRIMARY KEY ("dancerId");

-- DropTable
DROP TABLE "dance_level";

-- DropTable
DROP TABLE "level";

-- CreateTable
CREATE TABLE "call" (
    "callId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tamSeq" TEXT,

    CONSTRAINT "call_pkey" PRIMARY KEY ("callId")
);

-- CreateTable
CREATE TABLE "call_formation" (
    "callId" INTEGER NOT NULL,
    "startId" INTEGER NOT NULL,
    "endId" INTEGER NOT NULL,

    CONSTRAINT "call_formation_pkey" PRIMARY KEY ("callId","startId")
);

-- CreateTable
CREATE TABLE "formation" (
    "formId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "clCode" TEXT,
    "sdCode" TEXT,

    CONSTRAINT "formation_pkey" PRIMARY KEY ("formId")
);

-- CreateTable
CREATE TABLE "program" (
    "programId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "program_pkey" PRIMARY KEY ("programId")
);

-- CreateTable
CREATE TABLE "sequence" (
    "seqId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sequence_pkey" PRIMARY KEY ("seqId")
);

-- CreateTable
CREATE TABLE "sequence_calls" (
    "seqId" INTEGER NOT NULL,
    "callId" INTEGER NOT NULL,
    "startId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "helperText" TEXT,

    CONSTRAINT "sequence_calls_pkey" PRIMARY KEY ("seqId","callId","startId","order")
);

-- CreateTable
CREATE TABLE "dance_program" (
    "dancerId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "proficency" TEXT NOT NULL,

    CONSTRAINT "dance_program_pkey" PRIMARY KEY ("dancerId","programId","type","proficency")
);

-- CreateIndex
CREATE UNIQUE INDEX "call_name_key" ON "call"("name");

-- CreateIndex
CREATE INDEX "call_formation_startId_idx" ON "call_formation"("startId");

-- CreateIndex
CREATE INDEX "call_formation_endId_idx" ON "call_formation"("endId");

-- CreateIndex
CREATE UNIQUE INDEX "sequence_name_key" ON "sequence"("name");

-- AddForeignKey
ALTER TABLE "call_formation" ADD CONSTRAINT "call_formation_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("callId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_formation" ADD CONSTRAINT "call_formation_startId_fkey" FOREIGN KEY ("startId") REFERENCES "formation"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "call_formation" ADD CONSTRAINT "call_formation_endId_fkey" FOREIGN KEY ("endId") REFERENCES "formation"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sequence_calls" ADD CONSTRAINT "sequence_calls_seqId_fkey" FOREIGN KEY ("seqId") REFERENCES "sequence"("seqId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sequence_calls" ADD CONSTRAINT "sequence_calls_callId_fkey" FOREIGN KEY ("callId") REFERENCES "call"("callId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sequence_calls" ADD CONSTRAINT "sequence_calls_startId_fkey" FOREIGN KEY ("startId") REFERENCES "formation"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_group" ADD CONSTRAINT "dance_group_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "dancer"("dancerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_program" ADD CONSTRAINT "dance_program_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "dancer"("dancerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_program" ADD CONSTRAINT "dance_program_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("programId") ON DELETE RESTRICT ON UPDATE CASCADE;
