import { Sequelize } from "sequelize";

const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USERNAME } = process.env;

const postgres = new Sequelize(
  DB_NAME as string,
  DB_USERNAME as string,
  DB_PASSWORD as string,
  {
    host: DB_HOST as string,
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

export default postgres;
