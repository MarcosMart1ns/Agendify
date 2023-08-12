import {Usuario} from "./Usuario";

export class ClienteModel implements Usuario{
  nome: string = '';
  cnpj: string= '';
  email: string= '';
  senha: string= '';
  logradouro: string= '';
  bairro: string= '';
  cidade: string= '';
}
