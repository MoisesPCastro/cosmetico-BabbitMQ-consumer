import { Module } from "@nestjs/common";
import { cosmeticoModule } from "./cosmetico/cosmetico.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [cosmeticoModule, DatabaseModule],
})
export class AppModule {}
