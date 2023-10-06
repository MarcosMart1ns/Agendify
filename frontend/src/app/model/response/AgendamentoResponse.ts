export interface AgendamentoResponse {
  id: string;
  estabelecimento: {
    id: string;
    nome: string;
    urlFotoPerfil: string;
    email: string;
    tipo: number;
    cnpj: string;
    descricao: string;
  };
  cliente: {
    id: string; // UUID
    nome: string;
    urlFotoPerfil: string;
    email: string;
    tipo: number;
    cpf: string;
  };
  servico: {
    id: string;
    estabelecimentoId: string;
    nome: string;
    duracao: string;
  };
  data: string;
  status: string;
}
