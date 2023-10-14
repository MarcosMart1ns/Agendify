package com.agendify.domain.records;

import java.sql.Time;
import java.util.UUID;

public record ServicoResponse(UUID id,
                              UUID estabelecimentoId,
                              String nome,
                              Time duracao) {
}
