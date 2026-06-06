-- AlterTable
ALTER TABLE "call" ADD COLUMN     "dancerCount" INTEGER,
ADD COLUMN     "isGenderCall" BOOLEAN,
ADD COLUMN     "isPositional" BOOLEAN,
ADD COLUMN     "waveRuleApplies" BOOLEAN;

-- AlterTable
ALTER TABLE "formation" ADD COLUMN     "dancerCount" INTEGER;
