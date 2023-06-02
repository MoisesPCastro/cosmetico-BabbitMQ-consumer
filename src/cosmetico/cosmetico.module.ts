import { Module } from "@nestjs/common";
import { cosmeticoProvider } from "./cosmetico.provider";
import { DatabaseModule } from "src/database/database.module";
import { cosmeticoController } from "./cosmetico.controller";
import { CosmeticoService } from "./cosmetico.service";


@Module({
  imports: [DatabaseModule],
  controllers: [cosmeticoController],
  providers: [CosmeticoService, ...cosmeticoProvider],
})
export class cosmeticoModule {}
