import {MigrationInterface, QueryRunner} from "typeorm";

export class Business1639413790224 implements MigrationInterface {
    name = 'Business1639413790224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `business` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `owner_name` varchar(155) NULL, `age` int NULL, `email` varchar(155) NULL, `number` int NULL, `no_of_staff` int NULL, `no_of_shareholders` int NULL, `reference` varchar(155) NULL, `name_of_business` varchar(155) NULL, `title` varchar(155) NULL, `relocatable` varchar(155) NULL, `owner_managed` varchar(155) NULL, `reason_for_selling` varchar(155) NULL, `industry` varchar(155) NULL, `date_added` timestamp NULL, `year_established` timestamp NULL, `current_debts` double NULL, `projected_annual_profit` double NULL, `last_annual_profit` double NULL, `projected_annual_turnover` double NULL, `last_annual_turnover` double NULL, `asking_price` double NULL, `services` text NULL, `description` text NULL, `address` varchar(155) NULL, `area` varchar(155) NULL, `city` varchar(155) NULL, `map_position_lat` double NULL, `map_position_lng` double NULL, `marker_position_lat` double NULL, `marker_position_lng` double NULL, `state` varchar(155) NULL, INDEX `IDX_5a80f08912312846ed85e8e2b6` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `attachments` ADD `business_id` int NULL");
        await queryRunner.query("ALTER TABLE `attachments` ADD CONSTRAINT `FK_82ad87b32756b4760459417a48f` FOREIGN KEY (`business_id`) REFERENCES `business`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `attachments` DROP FOREIGN KEY `FK_82ad87b32756b4760459417a48f`");
        await queryRunner.query("ALTER TABLE `attachments` DROP COLUMN `business_id`");
        await queryRunner.query("DROP INDEX `IDX_5a80f08912312846ed85e8e2b6` ON `business`");
        await queryRunner.query("DROP TABLE `business`");
    }

}
