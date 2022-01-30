import { MigrationInterface, QueryRunner } from "typeorm";

export class emails1643578876600 implements MigrationInterface {
    name = 'emails1643578876600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `emails` (`deleted` tinyint(1) NOT NULL DEFAULT '0', `id` int NOT NULL AUTO_INCREMENT, `ts_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `ts_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `email` varchar(256) NULL, INDEX `IDX_0f75a94bc1c7296c3de455c504` (`deleted`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_0f75a94bc1c7296c3de455c504` ON `emails`");
        await queryRunner.query("DROP TABLE `emails`");
    }

}
