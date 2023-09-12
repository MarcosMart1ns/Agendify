package com.agendify.domain.mappers;

import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.records.PeriodoAtendimentoDTO;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class PeriodoAtendimentoMapper {

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Mapping(source = "estabelecimentoId", target = "estabelecimento", qualifiedByName = "getEstabelecimento")
    public abstract PeriodoAtendimento toEntity(PeriodoAtendimentoDTO periodoAtendimentoCreate);

    @Mapping(source = "estabelecimento.id", target = "estabelecimentoId")
    public abstract PeriodoAtendimentoDTO fromEntity(PeriodoAtendimento periodoAtendimento);

    @Named("getEstabelecimento")
    Estabelecimento getEstabelecimento(UUID estabelecimentoId) {
        return estabelecimentoRepository.findById(estabelecimentoId)
                .orElseThrow(() -> new EntityNotFoundException("Estabelecimento não encontrado: " + estabelecimentoId));
    }
}
