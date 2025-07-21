import path from "path";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";

export const dataSource = new DataSource({
  type: "postgres",
  url: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?options=-c%20client_encoding%3DWIN1252`,
  // host: process.env.DB_HOST!,
  // port: +process.env.DB_PORT!,
  // username: process.env.DB_USER!,
  // password: process.env.DB_PASS!,
  // database: process.env.DB_NAME!,
  entities: [User, path.join(__dirname, "./entities/**/*.entity.{js,ts}")],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: { charset: "WIN1252", options: "-c client_encoding=WIN1252" },
});
