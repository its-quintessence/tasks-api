import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./entities/User.ts";
import { Task } from "./entities/Task.ts";

config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  synchronize: true,
  logging: true,
  entities: [User, Task],
  subscribers: [],
  migrations: [],
});
