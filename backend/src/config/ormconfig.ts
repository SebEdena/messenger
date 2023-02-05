import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfiguration from './config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

export default new DataSource(dbConfiguration()['orm'] as any);
