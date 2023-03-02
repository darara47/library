import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1677783467089 implements MigrationInterface {
  name = 'setup1677783467089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "authors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, "deathDate" TIMESTAMP, "createdBy" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "publicationDate" TIMESTAMP NOT NULL, "genre" character varying NOT NULL, "totalCopies" integer NOT NULL, "availableCopies" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "authorId" uuid, CONSTRAINT "CHK_6ce3ab32f3df94a3aa7c61b7bb" CHECK ("totalCopies" >= "availableCopies"), CONSTRAINT "CHK_846143d8bd0fb98d2c4b7e61a1" CHECK ("availableCopies" >= 0), CONSTRAINT "CHK_8be56a193862000082cc598f5d" CHECK ("totalCopies" >= 0), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('reader', 'librarian', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "activationAccountToken" character varying, "activationAccountTokenExpiresAt" TIMESTAMP, "resetPasswordCode" character varying, "resetPasswordToken" character varying, "resetPasswordTokenExpiresAt" TIMESTAMP, "role" "public"."users_role_enum" NOT NULL DEFAULT 'reader', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "borrowed-book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "borrowedDate" TIMESTAMP NOT NULL, "returnDate" TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "bookId" uuid, "userId" uuid, CONSTRAINT "PK_e2a0f433954838dfb71724d4d5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrowed-book" ADD CONSTRAINT "FK_2feed2ffb21f2027df2990fb738" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrowed-book" ADD CONSTRAINT "FK_f02ce6381fa4d9f6ab9492be22a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "borrowed-book" DROP CONSTRAINT "FK_f02ce6381fa4d9f6ab9492be22a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "borrowed-book" DROP CONSTRAINT "FK_2feed2ffb21f2027df2990fb738"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`,
    );
    await queryRunner.query(`DROP TABLE "borrowed-book"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "books"`);
    await queryRunner.query(`DROP TABLE "authors"`);
  }
}
