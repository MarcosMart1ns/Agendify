package com.agendify.calendar.services;

import com.agendify.domain.entities.Agendamento;
import com.agendify.domain.entities.DiaDaSemana;
import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.repositories.AgendamentoRepository;
import com.agendify.domain.repositories.PeriodoAtendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class CalendarioService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    PeriodoAtendimentoRepository periodoAtendimentoRepository;

    public List<Agendamento> findCalendario(UUID id) {
        return agendamentoRepository
                .findAgendamentoByUserIdOrEstabelecimentoId(id);
    }

    public Agendamento createAgendamento(Agendamento entity) {

        return agendamentoRepository.save(entity);
    }

    private boolean isPeriodoValido(Date data, Estabelecimento estabelecimento){
        List<PeriodoAtendimento> periodosAtendimento = periodoAtendimentoRepository
                .findyByEstabelecimentoId(estabelecimento.getId());

        return periodosAtendimento.stream().anyMatch(periodo -> {
            LocalDateTime dateTimeData = data.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            DiaDaSemana diaDaSemanaData = DiaDaSemana.fromDayOfWeek(dateTimeData.getDayOfWeek());
            LocalTime horaData = dateTimeData.toLocalTime();

            return diaDaSemanaData == periodo.getDiaDaSemana() &&
                    horaData.isAfter(periodo.getHoraInicio()) &&
                    horaData.isBefore(periodo.getHoraFim());
        });
    }
}
