package com.agendify.domain.records;

import com.agendify.domain.entities.Status;
import com.agendify.domain.records.ClienteResponse;
import com.agendify.domain.records.EstabelecimentoResponse;
import com.agendify.domain.records.ServicoResponse;

import java.util.Date;
import java.util.UUID;

public record AgendamentoResponse(UUID id,
                                  EstabelecimentoResponse estabelecimento,
                                  ClienteResponse cliente,
                                  ServicoResponse servico,
                                  Date data,
                                  Status status) {
}
