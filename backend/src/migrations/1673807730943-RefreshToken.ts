import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshToken1673807730943 implements MigrationInterface {
  name = 'RefreshToken1673807730943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_8e913e288156c133999341156ad" UNIQUE ("userId"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "refresh_token"`);
  }
}
