import { MigrationInterface, QueryRunner } from "typeorm";

export class linkInBusiness1653249012884 implements MigrationInterface {
    name = 'linkInBusiness1653249012884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `businesses` ADD `link` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `businesses` DROP COLUMN `link`");
    }

}
