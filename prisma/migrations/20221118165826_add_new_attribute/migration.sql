/*
  Warnings:

  - You are about to drop the column `participantId` on the `Coordinator` table. All the data in the column will be lost.
  - You are about to drop the column `participantId` on the `ParticipantOnWhiteboard` table. All the data in the column will be lost.
  - You are about to drop the column `whiteboardId` on the `ParticipantOnWhiteboard` table. All the data in the column will be lost.
  - You are about to drop the column `coordinatorId` on the `Whiteboard` table. All the data in the column will be lost.
  - Added the required column `participant_id` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant_id` to the `ParticipantOnWhiteboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteboard_id` to the `ParticipantOnWhiteboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinator_id` to the `Whiteboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Coordinator` DROP FOREIGN KEY `Coordinator_participantId_fkey`;

-- DropForeignKey
ALTER TABLE `ParticipantOnWhiteboard` DROP FOREIGN KEY `ParticipantOnWhiteboard_participantId_fkey`;

-- DropForeignKey
ALTER TABLE `ParticipantOnWhiteboard` DROP FOREIGN KEY `ParticipantOnWhiteboard_whiteboardId_fkey`;

-- DropForeignKey
ALTER TABLE `Whiteboard` DROP FOREIGN KEY `Whiteboard_coordinatorId_fkey`;

-- AlterTable
ALTER TABLE `Coordinator` DROP COLUMN `participantId`,
    ADD COLUMN `participant_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Participant` ADD COLUMN `refresh_token` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ParticipantOnWhiteboard` DROP COLUMN `participantId`,
    DROP COLUMN `whiteboardId`,
    ADD COLUMN `participant_id` INTEGER NOT NULL,
    ADD COLUMN `whiteboard_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Whiteboard` DROP COLUMN `coordinatorId`,
    ADD COLUMN `coordinator_id` INTEGER NOT NULL,
    ALTER COLUMN `last_edited` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Coordinator` ADD CONSTRAINT `Coordinator_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Whiteboard` ADD CONSTRAINT `Whiteboard_coordinator_id_fkey` FOREIGN KEY (`coordinator_id`) REFERENCES `Coordinator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipantOnWhiteboard` ADD CONSTRAINT `ParticipantOnWhiteboard_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ParticipantOnWhiteboard` ADD CONSTRAINT `ParticipantOnWhiteboard_whiteboard_id_fkey` FOREIGN KEY (`whiteboard_id`) REFERENCES `Whiteboard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
