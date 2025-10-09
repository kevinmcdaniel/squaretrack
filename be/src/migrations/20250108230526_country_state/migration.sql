/*
  Warnings:

  - You are about to drop the column `country` on the `group` table. All the data in the column will be lost.
  - Added the required column `countryCode` to the `group` table without a default value. This is not possible if the table is not empty.
  - Made the column `state` on table `group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "group" DROP COLUMN "country",
ADD COLUMN     "countryCode" TEXT NOT NULL,
ALTER COLUMN "state" SET NOT NULL;

-- CreateTable
CREATE TABLE "country" (
    "code" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "country_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "state" (
    "countryCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "state_pkey" PRIMARY KEY ("countryCode","state")
);

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_countryCode_state_fkey" FOREIGN KEY ("countryCode", "state") REFERENCES "state"("countryCode", "state") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
