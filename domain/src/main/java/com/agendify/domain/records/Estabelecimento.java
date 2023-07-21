package com.agendify.domain.records;

import java.util.UUID;

public record Estabelecimento(
        UUID id,
        String nome,
        String urlFotoPerfil,
        String email,
        String senha,
        Long tipo,
        Endereco endereco,
        String cpnj,
        String descricao
//        List<Servico> servicos,
//        List<PeriodoAtendimento> periodosAtendimento
) {
}
