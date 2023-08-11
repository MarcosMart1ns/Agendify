package com.agendify.calendar.services;

import com.agendify.domain.entities.Servico;
import com.agendify.domain.repositories.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public Servico createServico(Servico servico) {
        return servicoRepository.save(servico);
    }
}
