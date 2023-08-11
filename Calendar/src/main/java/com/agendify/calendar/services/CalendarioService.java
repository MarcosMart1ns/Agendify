package com.agendify.calendar.services;

import com.agendify.calendar.controllers.exception.HorarioIndisponivelException;
import com.agendify.calendar.controllers.exception.ValidationError;
import com.agendify.domain.entities.Agendamento;
import com.agendify.domain.entities.DiaDaSemana;
import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.entities.Status;
import com.agendify.domain.repositories.AgendamentoRepository;
import com.agendify.domain.repositories.PeriodoAtendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.Duration;
import java.time.Instant;
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

    public Agendamento createAgendamento(Agendamento entity) throws HorarioIndisponivelException {
        entity.setStatus(Status.AGENDADO);
        if(entity.getData().before(new Date())){
//            TODO: Criar uma exception  para este cenário
            throw new HorarioIndisponivelException("A data e horário do agendamento deve ser maior que a data e horário atual.");
        }
        validaPeriodoAtendimento(entity.getData(), entity.getEstabelecimento());
        validaHorarioDisponivel(entity);
        return agendamentoRepository.save(entity);
    }

    private void validaHorarioDisponivel(Agendamento entity) throws HorarioIndisponivelException {
        Instant dataInstant = entity.getData().toInstant();
        LocalTime duracao = entity.getServico().getDuracao().toLocalTime();

        Instant novaDataInstant = dataInstant.plus(Duration.ofHours(duracao.getHour()).plusMinutes(duracao.getMinute()));
        Date dataFinal = Date.from(novaDataInstant);

        List<Agendamento> agendamentosDisponiveis = agendamentoRepository
                .findAgendamentosDisponiveis(entity.getData(), dataFinal, entity.getEstabelecimento().getId());
        if(!agendamentosDisponiveis.isEmpty()){
            throw new HorarioIndisponivelException("O horário solicitado não está disponível");
        }
    }

    private void validaPeriodoAtendimento(Date data, Estabelecimento estabelecimento) throws HorarioIndisponivelException {
        List<PeriodoAtendimento> periodosAtendimento = periodoAtendimentoRepository
                .findByEstabelecimento_Id(estabelecimento.getId());


        periodosAtendimento.stream()
                .filter(periodo -> {
                    LocalDateTime dateTimeData = data.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                    DiaDaSemana diaDaSemanaData = DiaDaSemana.fromDayOfWeek(dateTimeData.getDayOfWeek());
                    LocalTime horaData = dateTimeData.toLocalTime();

                    return diaDaSemanaData == periodo.getDiaDaSemana() &&
                            horaData.isAfter(periodo.getHoraInicio()) &&
                            horaData.isBefore(periodo.getHoraFim());
                })
                .findAny()
                .orElseThrow(() -> new HorarioIndisponivelException("O horário se encontra fora do periodo de atendimento do pres"));
    }
}
