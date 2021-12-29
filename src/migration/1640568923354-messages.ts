import {MigrationInterface, QueryRunner} from "typeorm";

export class messages1640568923354 implements MigrationInterface {
    name = 'messages1640568923354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `messages` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `posted_by` varchar(256) NULL, `email` varchar(256) NULL, `subject` varchar(256) NULL, `message` text NULL, `business_id` int NULL, INDEX `IDX_900c76fd2b416c44664a7be234` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `messages` ADD CONSTRAINT `FK_1fe66d9cd8e2d40ddd8994d7037` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `messages` DROP FOREIGN KEY `FK_1fe66d9cd8e2d40ddd8994d7037`");
        await queryRunner.query("DROP INDEX `IDX_900c76fd2b416c44664a7be234` ON `messages`");
        await queryRunner.query("DROP TABLE `messages`");
    }

}
