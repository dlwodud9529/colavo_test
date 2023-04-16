import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";
dotenv.config();

export const DB = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: ["/entity/**/*.ts"],
    migrations: [],
    subscribers: [],
})
