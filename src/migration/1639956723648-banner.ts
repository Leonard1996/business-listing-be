import {MigrationInterface, QueryRunner} from "typeorm";

export class banner1639956723648 implements MigrationInterface {
    name = 'banner1639956723648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `banners` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `path` mediumtext NULL, `business_id` int NULL, INDEX `IDX_e03c850fab75542e2a1b1ca624` (`deleted`), UNIQUE INDEX `REL_eb5231dc85a171d8f26ff261b6` (`business_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `banners` ADD CONSTRAINT `FK_eb5231dc85a171d8f26ff261b68` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `banners` DROP FOREIGN KEY `FK_eb5231dc85a171d8f26ff261b68`");
        await queryRunner.query("DROP INDEX `REL_eb5231dc85a171d8f26ff261b6` ON `banners`");
        await queryRunner.query("DROP INDEX `IDX_e03c850fab75542e2a1b1ca624` ON `banners`");
        await queryRunner.query("DROP TABLE `banners`");
    }

}
