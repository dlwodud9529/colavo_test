import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";
dotenv.config();

import { schedule } from "./entity/schedule"
import { event } from "./entity/event"
import { workhour } from "./entity/workhour"

export const DB = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [schedule, event, workhour],
    migrations: [],
    subscribers: [],
})
