package com.agendify.users.services;

import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.repositories.PeriodoAtendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PeriodoAtendimentoService {

    @Autowired
    private PeriodoAtendimentoRepository periodoAtendimentoRepository;

    public PeriodoAtendimento createPeriodoAtendimento(PeriodoAtendimento periodoAtendimento){
        return periodoAtendimentoRepository.save(periodoAtendimento);
    }
}
