-- DropForeignKey
ALTER TABLE "presentation_item" DROP CONSTRAINT "presentation_item_moduleId_fkey";

-- AddForeignKey
ALTER TABLE "presentation_item" ADD CONSTRAINT "presentation_item_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "choreo_module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
