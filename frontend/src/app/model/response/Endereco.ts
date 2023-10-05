import {Cidade} from "./Cidade";

export interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: Cidade;
}
