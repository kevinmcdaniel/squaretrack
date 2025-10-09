-- CreateTable
CREATE TABLE "level" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dancer" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,

    CONSTRAINT "dancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dance_group" (
    "dancerId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "proficency" TEXT NOT NULL,

    CONSTRAINT "dance_group_pkey" PRIMARY KEY ("dancerId","groupId")
);

-- CreateTable
CREATE TABLE "dance_level" (
    "dancerId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "proficency" TEXT NOT NULL,

    CONSTRAINT "dance_level_pkey" PRIMARY KEY ("dancerId","levelId","type")
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group_assocations" (
    "groupId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "group_assocations_pkey" PRIMARY KEY ("groupId","parentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "dancer_email_key" ON "dancer"("email");

-- CreateIndex
CREATE INDEX "dancer_email_idx" ON "dancer"("email");

-- CreateIndex
CREATE INDEX "group_name_idx" ON "group"("name");

-- AddForeignKey
ALTER TABLE "dance_group" ADD CONSTRAINT "dance_group_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "dancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_group" ADD CONSTRAINT "dance_group_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_level" ADD CONSTRAINT "dance_level_dancerId_fkey" FOREIGN KEY ("dancerId") REFERENCES "dancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dance_level" ADD CONSTRAINT "dance_level_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_assocations" ADD CONSTRAINT "group_assocations_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_assocations" ADD CONSTRAINT "group_assocations_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
