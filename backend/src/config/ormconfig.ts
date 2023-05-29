import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfiguration from './config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

export default new DataSource({
  ...dbConfiguration()['orm'],
  entities: ['../common/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as any);
