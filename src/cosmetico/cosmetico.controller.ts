import { Controller, HttpStatus, Res, Get } from "@nestjs/common";
import { Response } from "express";
import { IcosmeticoController } from "./cosmetico.resoucer";
import { cosmeticoService } from "./cosmetico.service";

@Controller("cosmetico/v1/consumer")
export class cosmeticoController implements IcosmeticoController {
  constructor(private readonly service: cosmeticoService) {}

  @Get("/produtos")
  async list(@Res() res: Response): Promise<Response> {
    try {
      const result = await this.service.list();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send("Interval server error!");
    }
  }
}
