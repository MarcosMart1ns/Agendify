package com.agendify.domain.records;

import com.agendify.domain.entities.DiaDaSemana;

import java.time.LocalTime;
import java.util.UUID;


public record PeriodoAtendimentoDTO<diaDaSemana>(
        UUID estabelecimentoId,

        DiaDaSemana diaDaSemana,

        LocalTime horaInicio,

        LocalTime horaFim
) {
}
