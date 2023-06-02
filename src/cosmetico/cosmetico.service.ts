import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { IService } from "./cosmetico.resoucer";
import { Produtos } from "./cosmetico.entity";

@Injectable()
export class CosmeticoService implements IService {
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

  async save(produtos: Produtos): Promise<void> {
    try {
      delete produtos?.id;
      await this.produtoRepository.save(produtos);
    } catch (error) {
      console.error("server internal error!", error);
      throw new Error(error);
    }
  }
}
