import { Module } from "@nestjs/common";
import { cosmeticoProvider } from "./cosmetico.provider";
import { DatabaseModule } from "src/database/database.module";
import { cosmeticoController } from "./cosmetico.controller";
import { cosmeticoService } from "./cosmetico.service";


@Module({
  imports: [DatabaseModule],
  controllers: [cosmeticoController],
  providers: [cosmeticoService, ...cosmeticoProvider],
})
export class cosmeticoModule {}
