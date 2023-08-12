package com.agendify.calendar.controllers.mappers;

import com.agendify.domain.entities.Status;

import java.util.Date;
import java.util.UUID;

public record AgendamentoResponse(UUID id,
                                  UUID estabelecimentoId,
                                  UUID clienteId,
                                  ServicoResponse servico,
                                  Date data,
                                  Status status) {
}
