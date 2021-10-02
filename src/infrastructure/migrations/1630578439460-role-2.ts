import {MigrationInterface, QueryRunner} from "typeorm";

export class role21630578439460 implements MigrationInterface {
    name = 'role21630578439460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" integer NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" integer NOT NULL DEFAULT '2'`);
    }

}
