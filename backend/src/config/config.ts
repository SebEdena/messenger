export default () => ({
  database: process.env.DATABASE_URL,
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS) || 10,
  },
  orm: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrationsRun: false,
    entities: ['src/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    migrations: ['src/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
});
