import { Response } from "express";
import { Controller, HttpStatus, Res, Get } from "@nestjs/common";
import * as http from "http";
import { IcosmeticoController } from "./cosmetico.resoucer";
import { CosmeticoService } from "./cosmetico.service";
import CosmeticoMessageChannel from "../utils/CosmeticoMessageChannel";

@Controller("cosmetico/v1/consumer")
export class cosmeticoController implements IcosmeticoController {
  private readonly cosmeticoChannel: CosmeticoMessageChannel;
  constructor(private readonly service: CosmeticoService) {
    this.cosmeticoChannel = new CosmeticoMessageChannel(
      http.createServer(),
      service
    );
  }

  @Get("/produtos")
  async list(@Res() res: Response): Promise<Response> {
    try {
      await this.cosmeticoChannel.consumeMessages();
      const result = await this.service.list();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send("Interval server error!");
    }
  }
}
