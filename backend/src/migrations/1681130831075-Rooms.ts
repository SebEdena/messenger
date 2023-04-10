import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rooms1681130831075 implements MigrationInterface {
  name = 'Rooms1681130831075';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_user" ("roomId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_782693224c954db86609f4066a2" PRIMARY KEY ("roomId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_507b03999779b22e06538595de" ON "room_user" ("roomId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_27dad61266db057665ee1b13d3" ON "room_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "room_user" ADD CONSTRAINT "FK_507b03999779b22e06538595dec" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_user" ADD CONSTRAINT "FK_27dad61266db057665ee1b13d3d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_user" DROP CONSTRAINT "FK_27dad61266db057665ee1b13d3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_user" DROP CONSTRAINT "FK_507b03999779b22e06538595dec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_27dad61266db057665ee1b13d3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_507b03999779b22e06538595de"`,
    );
    await queryRunner.query(`DROP TABLE "room_user"`);
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
