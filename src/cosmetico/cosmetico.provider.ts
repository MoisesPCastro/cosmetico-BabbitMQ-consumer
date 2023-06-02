import { Repository, DataSource } from "typeorm";
import { Provider } from "@nestjs/common";
import { Produtos } from "./cosmetico.entity";

const cosmeticoRepository: Provider<Repository<Produtos>> = {
  provide: "COSMETICO_REPOSITORY",
  useFactory: (dataSouce: DataSource) => {
    return dataSouce.getRepository(Produtos);
  },
  inject: ["DATA_SOURCE_MYSQL"],
};

export const cosmeticoProvider: Provider[] = [cosmeticoRepository];
