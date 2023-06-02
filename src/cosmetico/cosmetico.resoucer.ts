import { Response } from "express";
import { Produtos } from "./cosmetico.entity";
export class IProduto {
  id: number;
  name_produto: string;
  provider: string;
  categoria: string;
  value: string;
  description?: string | null;
  promotion?: string | null;
  date_update?: Date | null;
  date_create: Date;
}

export type IProdutoRequest = Omit<IProduto, "id">;

export interface IService {
    list(): Promise<Produtos []>;
    save(produtos: Produtos): Promise<void>;
}

export interface IcosmeticoController {
  list(res: Response): Promise<Response>;
}
