package com.agendify.domain.records;

import java.util.Date;
import java.util.UUID;

public record AgendamentoCreate(
        UUID estabelecimentoId,
        UUID clienteId,
        UUID servicoId,
        Date data
) {
}
