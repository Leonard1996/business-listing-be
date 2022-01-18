import {MigrationInterface, QueryRunner} from "typeorm";

export class Likes1642516868445 implements MigrationInterface {
    name = 'Likes1642516868445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `likes` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `business_id` int NULL, `user_id` int NULL, INDEX `IDX_f7f23406bf57f0f695ed66bf10` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `likes` ADD CONSTRAINT `FK_5f232594c7e73af06129a6afc80` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `likes` ADD CONSTRAINT `FK_3f519ed95f775c781a254089171` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `likes` DROP FOREIGN KEY `FK_3f519ed95f775c781a254089171`");
        await queryRunner.query("ALTER TABLE `likes` DROP FOREIGN KEY `FK_5f232594c7e73af06129a6afc80`");
        await queryRunner.query("DROP INDEX `IDX_f7f23406bf57f0f695ed66bf10` ON `likes`");
        await queryRunner.query("DROP TABLE `likes`");
    }

}
