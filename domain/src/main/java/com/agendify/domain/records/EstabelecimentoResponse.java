package com.agendify.domain.records;

import java.util.UUID;

public record EstabelecimentoResponse(
        UUID id,
        String nome,
        String urlFotoPerfil,
        String email,
        Long tipo,
        Endereco endereco,
        String cnpj,
        String descricao
//        List<Servico> servicos,
//        List<PeriodoAtendimento> periodosAtendimento
) {
}
