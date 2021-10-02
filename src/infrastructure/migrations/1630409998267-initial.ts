import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1630409998267 implements MigrationInterface {
    name = 'initial1630409998267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Authentication"."Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isDeleted" boolean DEFAULT false, "deletedBy" character varying(300), "createdDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "createdBy" character varying(300), "updatedDateTime" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" character varying(300), "name" character varying(300) NOT NULL, "username" character varying(30) NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Authentication"."Users"`);
    }

}
