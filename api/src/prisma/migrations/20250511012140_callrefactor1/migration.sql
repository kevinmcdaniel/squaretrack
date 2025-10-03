-- CreateTable
CREATE TABLE "call" (
    "callId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tamSeq" TEXT,
    "familyId" INTEGER,

    CONSTRAINT "call_pkey" PRIMARY KEY ("callId")
);

-- CreateTable
CREATE TABLE "call_family" (
    "familyId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "call_family_pkey" PRIMARY KEY ("familyId")
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
CREATE TABLE "country" (
    "code" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "dancer" (
    "dancerId" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "dancer_pkey" PRIMARY KEY ("dancerId")
);

-- CreateTable
CREATE TABLE "dance_group" (
    "dancerId" INTEGER NOT NULL,
    "groupId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "proficency" TEXT NOT NULL,

    CONSTRAINT "dance_group_pkey" PRIMARY KEY ("dancerId","groupId")
);

-- CreateTable
CREATE TABLE "dance_program" (
    "dancerId" INTEGER NOT NULL,
    "programId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "proficency" TEXT NOT NULL,

    CONSTRAINT "dance_program_pkey" PRIMARY KEY ("dancerId","programId","type","proficency")
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_assocations" (
    "groupId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "group_assocations_pkey" PRIMARY KEY ("groupId","parentId")
);

-- CreateTable
CREATE TABLE "state" (
    "countryCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "state_pkey" PRIMARY KEY ("countryCode","state")
);

-- CreateIndex
CREATE UNIQUE INDEX "call_name_key" ON "call"("name");

-- CreateIndex
CREATE INDEX "call_formation_startId_idx" ON "call_formation"("startId");

-- CreateIndex
CREATE INDEX "call_formation_endId_idx" ON "call_formation"("endId");

-- CreateIndex
CREATE UNIQUE INDEX "sequence_name_key" ON "sequence"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dancer_email_key" ON "dancer"("email");

-- CreateIndex
CREATE INDEX "dancer_email_idx" ON "dancer"("email");

-- CreateIndex
CREATE INDEX "group_name_idx" ON "group"("name");

-- AddForeignKey
ALTER TABLE "call" ADD CONSTRAINT "call_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "call_family"("familyId") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "dance_group" ADD CONSTRAINT "dance_group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_program" ADD CONSTRAINT "dance_program_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "dancer"("dancerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_program" ADD CONSTRAINT "dance_program_programId_fkey" FOREIGN KEY ("programId") REFERENCES "program"("programId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_countryCode_state_fkey" FOREIGN KEY ("countryCode", "state") REFERENCES "state"("countryCode", "state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_assocations" ADD CONSTRAINT "group_assocations_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_assocations" ADD CONSTRAINT "group_assocations_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
