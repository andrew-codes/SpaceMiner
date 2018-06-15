const {
  API_PORT,
  DB_PASSWORD,
  DB_HOST,
  DB_USERNAME,
  NODE_ENV,
  WEB_PORT,
} = process.env;

export default {
  apiPort: API_PORT,
  db: {
    password: DB_PASSWORD,
    host: DB_HOST,
    username: DB_USERNAME,
  },
  env: NODE_ENV,
  webPort: WEB_PORT,
};
