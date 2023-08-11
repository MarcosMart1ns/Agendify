package com.agendify.calendar.controllers.mappers;

import java.sql.Time;
import java.util.UUID;

public record ServicoResponse(UUID id,
                              UUID estabelecimentoId,
                              String nome,
                              Time duracao) {
}
