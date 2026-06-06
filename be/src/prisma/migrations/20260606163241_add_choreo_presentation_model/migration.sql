-- CreateTable
CREATE TABLE "choreo_module" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startFormId" INTEGER NOT NULL,
    "endFormId" INTEGER NOT NULL,
    "inFlowRotation" TEXT,
    "inFlowDirection" TEXT,
    "outFlowRotation" TEXT,
    "outFlowDirection" TEXT,
    "isValid" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "variantGroupId" TEXT,
    "safeAfterEntryOrder" INTEGER,
    "safeAfterFasrOrder" INTEGER,
    "teachOrderId" INTEGER,

    CONSTRAINT "choreo_module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choreo_module_step" (
    "moduleId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "callId" INTEGER NOT NULL,
    "startId" INTEGER NOT NULL,
    "designator" TEXT,
    "count" INTEGER,
    "warning" TEXT,

    CONSTRAINT "choreo_module_step_pkey" PRIMARY KEY ("moduleId","order")
);

-- CreateTable
CREATE TABLE "presentation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT,
    "activator" TEXT,
    "rating" TEXT,
    "notes" TEXT,
    "sourceText" TEXT,

    CONSTRAINT "presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presentation_item" (
    "id" SERIAL NOT NULL,
    "presentationId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "moduleId" INTEGER,
    "text" TEXT,
    "textType" TEXT,

    CONSTRAINT "presentation_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presentation_item_step" (
    "itemId" INTEGER NOT NULL,
    "stepOrder" INTEGER NOT NULL,
    "textBefore" TEXT,
    "textAfter" TEXT,
    "callNameAlternate" TEXT,
    "warning" TEXT,
    "helperText" TEXT,

    CONSTRAINT "presentation_item_step_pkey" PRIMARY KEY ("itemId","stepOrder")
);

-- CreateIndex
CREATE INDEX "choreo_module_variantGroupId_idx" ON "choreo_module"("variantGroupId");

-- CreateIndex
CREATE INDEX "choreo_module_step_callId_startId_idx" ON "choreo_module_step"("callId", "startId");

-- CreateIndex
CREATE UNIQUE INDEX "presentation_item_presentationId_order_key" ON "presentation_item"("presentationId", "order");

-- AddForeignKey
ALTER TABLE "choreo_module" ADD CONSTRAINT "choreo_module_startFormId_fkey" FOREIGN KEY ("startFormId") REFERENCES "formation"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choreo_module" ADD CONSTRAINT "choreo_module_endFormId_fkey" FOREIGN KEY ("endFormId") REFERENCES "formation"("formId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choreo_module" ADD CONSTRAINT "choreo_module_teachOrderId_fkey" FOREIGN KEY ("teachOrderId") REFERENCES "teach_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choreo_module_step" ADD CONSTRAINT "choreo_module_step_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "choreo_module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "choreo_module_step" ADD CONSTRAINT "choreo_module_step_callId_startId_fkey" FOREIGN KEY ("callId", "startId") REFERENCES "call_formation"("callId", "startId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presentation_item" ADD CONSTRAINT "presentation_item_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "presentation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presentation_item" ADD CONSTRAINT "presentation_item_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "choreo_module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presentation_item_step" ADD CONSTRAINT "presentation_item_step_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "presentation_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
