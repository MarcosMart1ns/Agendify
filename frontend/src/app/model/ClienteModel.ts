import {Usuario} from "./Usuario";

export class ClienteModel implements Usuario{
  nome: string = '';
  cpf: string= '';
  email: string= '';
  senha: string= '';
  logradouro: string= '';
  bairro: string= '';
  cidade: string= '';
}
