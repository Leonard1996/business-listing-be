import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1639924973841 implements MigrationInterface {
    name = 'initialMigration1639924973841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `username` varchar(256) NOT NULL, `password` varchar(256) NULL, `name` varchar(256) NOT NULL, `surname` varchar(256) NOT NULL, `email` varchar(256) NOT NULL, `profile_picture` varchar(256) NOT NULL, `role` varchar(256) NOT NULL, `verified` tinyint(1) NOT NULL DEFAULT '0', `is_tutorial_checked` tinyint NOT NULL DEFAULT '0', `verify_token` varchar(256) NULL, `ts_verify_token_expiration` timestamp NULL, `modify_password_token` varchar(256) NULL, `ts_modify_password_token_expiration` timestamp NULL, `phone_number` varchar(255) NULL, INDEX `IDX_b147a0c758f65b438f114cc193` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `businesses` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `owner_name` varchar(155) NULL, `age` int NULL, `email` varchar(155) NULL, `number` varchar(155) NULL, `no_of_staff` int NULL, `no_of_shareholders` int NULL, `reference` varchar(155) NULL, `name_of_business` varchar(155) NULL, `title` varchar(155) NULL, `relocatable` varchar(155) NULL, `owner_managed` varchar(155) NULL, `reason_for_selling` varchar(155) NULL, `industry` varchar(155) NULL, `date_added` timestamp NULL, `year_established` timestamp NULL, `current_debts` double NULL, `projected_annual_profit` double NULL, `last_annual_profit` double NULL, `projected_annual_turnover` double NULL, `last_annual_turnover` double NULL, `asking_price` double NULL, `services` text NULL, `description` text NULL, `address` varchar(155) NULL, `area` varchar(155) NULL, `city` varchar(155) NULL, `map_position_lat` double NULL, `map_position_lng` double NULL, `marker_position_lat` double NULL, `marker_position_lng` double NULL, `state` varchar(155) NULL, `user_id` int NULL, INDEX `IDX_a50638df9ac70d76da4840a234` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `attachments` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `name` varchar(256) NOT NULL, `original_name` varchar(256) NOT NULL, `mime_type` varchar(128) NOT NULL, `extension` varchar(128) NOT NULL, `size_in_bytes` int NOT NULL, `path` mediumtext NULL, `is_banner` tinyint(1) NULL DEFAULT '0', `business_id` int NULL, INDEX `IDX_57f4205162470cedb447cc1486` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `refresh_token` (`id` int NOT NULL AUTO_INCREMENT, `access_token` varchar(256) NOT NULL, `refresh_token` varchar(256) NOT NULL, `ts_expiration` timestamp NOT NULL, `user_id` int NULL, UNIQUE INDEX `IDX_07ec1391b1de6e40fb0bfb07fa` (`refresh_token`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `attachments` ADD CONSTRAINT `FK_82ad87b32756b4760459417a48f` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `refresh_token` ADD CONSTRAINT `FK_6bbe63d2fe75e7f0ba1710351d4` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `refresh_token` DROP FOREIGN KEY `FK_6bbe63d2fe75e7f0ba1710351d4`");
        await queryRunner.query("ALTER TABLE `attachments` DROP FOREIGN KEY `FK_82ad87b32756b4760459417a48f`");
        await queryRunner.query("DROP INDEX `IDX_07ec1391b1de6e40fb0bfb07fa` ON `refresh_token`");
        await queryRunner.query("DROP TABLE `refresh_token`");
        await queryRunner.query("DROP INDEX `IDX_57f4205162470cedb447cc1486` ON `attachments`");
        await queryRunner.query("DROP TABLE `attachments`");
        await queryRunner.query("DROP INDEX `IDX_a50638df9ac70d76da4840a234` ON `businesses`");
        await queryRunner.query("DROP TABLE `businesses`");
        await queryRunner.query("DROP INDEX `IDX_b147a0c758f65b438f114cc193` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
