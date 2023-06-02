import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { config } from "dotenv";

config();
export const dataBaseProviders: Provider[] = [
  {
    provide: "DATA_SOURCE_MYSQL",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mysql",
        host: "localhost",
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password:  process.env.DB_PASSWORD,
        database:  process.env.DB_NAME,
        entities: [__dirname + "/../**/*entity{.ts,.js}"],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

