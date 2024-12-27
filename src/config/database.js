const mysql = require("serverless-mysql");
const {
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USERNAME,
  MYSQL_PORT,
  MYSQL_DATABASE,
} = require("./env");

let instance = null;

const createInstance = () => {
  return mysql({
    config: {
      host: MYSQL_HOST || "127.0.0.1",
      user: MYSQL_USERNAME || "root",
      password: MYSQL_PASSWORD || "******",
      database: MYSQL_DATABASE,
      port: MYSQL_PORT || 3306,
    },
  });
};

const getInstance = () => {
  if (!instance) {
    return createInstance();
  }

  return instance;
};

module.exports = getInstance;
