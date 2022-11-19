/*
  Warnings:

  - Made the column `refresh_token` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Participant` MODIFY `refresh_token` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Whiteboard` ALTER COLUMN `last_edited` DROP DEFAULT;
