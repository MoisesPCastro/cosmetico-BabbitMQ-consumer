import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Produtos } from "./cosmetico.entity";
import { IService } from "./cosmetico.resoucer";

@Injectable()
export class cosmeticoService implements IService {
  constructor(
    @Inject("COSMETICO_REPOSITORY")
    private readonly produtoRepository: Repository<Produtos>
  ) {}
  async list(): Promise<Produtos[]> {
    try {
      return await this.produtoRepository.find();
    } catch (error) {
      console.error("server internal error!");
      throw new Error(error);
    }
  }
}
