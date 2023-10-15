package com.agendify.agendifyapplication.service;

import com.agendify.domain.entities.Agendamento;
import com.agendify.domain.entities.Status;
import com.agendify.domain.repositories.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    private AgendamentoRepository agendamentoRepository;

    @Autowired
    public ScheduleService(AgendamentoRepository agendamentoRepository){
        this.agendamentoRepository = agendamentoRepository;
    }

    @Scheduled(cron = "0 0 * * * *")
    public void jobAtualizaStatusAgendamento(){
        List<Agendamento> agendamentosAbertos = agendamentoRepository.findAgendamentosAbertosAntesDaDataAtual();
        agendamentosAbertos.forEach(agendamento -> agendamento.setStatus(Status.CONCLUIDO));
        agendamentoRepository.saveAllAndFlush(agendamentosAbertos);
    }
}
