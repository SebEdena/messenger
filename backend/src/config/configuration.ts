export default () => ({
  database: process.env.DATABASE_URL,
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS) || 10,
  },
});
