import {MigrationInterface, QueryRunner} from "typeorm";

export class UserActive1630590995851 implements MigrationInterface {
    name = 'UserActive1630590995851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" character varying NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Authentication"."Users" ADD "role" character varying NOT NULL DEFAULT '2'`);
    }

}
