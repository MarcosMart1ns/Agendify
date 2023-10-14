package com.agendify.domain.records;

import com.agendify.domain.entities.Servico;

import java.util.List;
import java.util.UUID;

public record Estabelecimento(
        UUID id,
        String nome,
        String urlFotoPerfil,
        String email,
        String senha,
        Long tipo,
        Endereco endereco,
        String cnpj,
        String descricao,

        List<ServicoResponse> servicos,
        List<PeriodoAtendimentoDTO> periodosAtendimento
) {
}
