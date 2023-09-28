import {Endereco} from "./Endereco";

export interface Cliente {
  id: string;
  nome: string;
  urlFotoPerfil: string;
  senha:string;
  email: string;
  tipo: number;
  endereco: Endereco;
  cpf: string;
}
