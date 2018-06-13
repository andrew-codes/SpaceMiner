const {
  DB_PASSWORD,
  DB_URL,
  DB_USERNAME,
  NODE_ENV,
} = process.env;

export default function getConfig() {
  return {
    env: NODE_ENV,
    db: {
      password: DB_PASSWORD,
      url: DB_URL,
      username: DB_USERNAME,
    },
  };
};
