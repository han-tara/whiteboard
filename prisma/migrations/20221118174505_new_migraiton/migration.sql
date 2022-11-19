/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Participant` DROP COLUMN `refresh_token`,
    ADD COLUMN `hash_rt` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Whiteboard` ALTER COLUMN `last_edited` DROP DEFAULT;
