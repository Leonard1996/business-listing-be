import { MigrationInterface, QueryRunner } from "typeorm";

export class linkInMessages1653249150627 implements MigrationInterface {
    name = 'linkInMessages1653249150627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `businesses` DROP COLUMN `link`");
        await queryRunner.query("ALTER TABLE `messages` ADD `link` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `messages` DROP COLUMN `link`");
        await queryRunner.query("ALTER TABLE `businesses` ADD `link` varchar(255) NULL");
    }

}
