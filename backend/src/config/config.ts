export default () => ({
  database: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES },
  },
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS) || 10,
  },
  orm: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrationsRun: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    migrations: [__dirname + '/../**/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
});
