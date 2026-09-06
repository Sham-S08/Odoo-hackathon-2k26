CREATE TABLE `SubscriptionPlan` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cadence` VARCHAR(191) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `prorationRule` VARCHAR(191) NULL,
    `cancellationRule` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `SubscriptionPlan_companyId_active_idx`(`companyId`),
    CONSTRAINT `SubscriptionPlan_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
