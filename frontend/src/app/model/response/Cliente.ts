import {Endereco} from "./Endereco";

export interface Cliente {
  id: string;
  nome: string;
  urlFotoPerfil: string;
  senha:string;
  email: string;
  tipo: string;
  endereco: Endereco;
  cpf: string;
}
