import {MigrationInterface, QueryRunner} from "typeorm";

export class role41630578620577 implements MigrationInterface {
    name = 'role41630578620577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" character varying NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" integer DEFAULT '2'`);
    }

}
