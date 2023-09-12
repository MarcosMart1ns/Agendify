package com.agendify.calendar.controllers.mappers;

import java.util.Date;
import java.util.UUID;

public record AgendamentoCreate(
        UUID estabelecimentoId,
        UUID clienteId,
        UUID servicoId,
        Date data
) {
}
