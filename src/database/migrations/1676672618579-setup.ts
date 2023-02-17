import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1676672618579 implements MigrationInterface {
  name = 'setup1676672618579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_type_enum" AS ENUM('reader', 'librarian', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "activationAccountToken" character varying, "activationAccountTokenExpiresAt" TIMESTAMP, "resetPasswordCode" character varying, "resetPasswordToken" character varying, "resetPasswordTokenExpiresAt" TIMESTAMP, "type" "public"."users_type_enum" NOT NULL DEFAULT 'reader', "createdBy" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
  }
}
