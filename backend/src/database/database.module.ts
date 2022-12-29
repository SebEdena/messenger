import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

const providers = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

@Module({
  providers: providers,
  exports: providers,
})
export class DatabaseModule {}
