package com.agendify.users.services;

import com.agendify.domain.mappers.EstabelecimentoMapper;
import com.agendify.domain.records.Estabelecimento;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class EstabelecimentoService {

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private EstabelecimentoMapper estabelecimentoMapper;

    public Estabelecimento findEstabelecimento(UUID id) {
        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.findById(id).orElse(null);
        return estabelecimentoMapper.fromEntity(estabelecimento);
    }

    public Estabelecimento createEstabelecimento(Estabelecimento estabelecimento) {
        com.agendify.domain.entities.Estabelecimento estabelecimentoCreated = estabelecimentoRepository.save(estabelecimentoMapper.toEntity(estabelecimento));
        return estabelecimentoMapper.fromEntity(estabelecimentoCreated);
    }

    public List<Estabelecimento> searchEstabelecimento(String searchText) {
        return Collections.emptyList();
    }
}
