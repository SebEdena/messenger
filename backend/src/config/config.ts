export default () => ({
  app: {
    defaultPagination: parseInt(process.env.APP_PAGINATION) || 20,
  },
  auth: {
    local: process.env.LOCAL === 'true',
    localAccount: process.env.LOCAL_ACCOUNT ?? '',
  },
  database: process.env.DATABASE_URL,
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    },
  },
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS) || 10,
  },
  orm: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrationsRun: false,
    autoLoadEntities: true,
    logging: process.env.LOCAL === 'true',
  },
});
