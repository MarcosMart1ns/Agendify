package com.agendify.domain.mappers;

import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.entities.Servico;
import com.agendify.domain.records.ServicoCreate;
import com.agendify.domain.records.ServicoResponse;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class ServicoMapper {

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Mapping(target = "estabelecimento", source = "estabelecimentoId",qualifiedByName = "getEstabelecimento")
    public abstract Servico toEntity(ServicoCreate servicoCreate);

    @Mapping(target = "estabelecimento", source = "estabelecimentoId",qualifiedByName = "getEstabelecimento")
    public abstract Servico toEntity(ServicoResponse servicoCreate);

    @Mapping(target = "estabelecimentoId", source = "estabelecimento.id")
    public abstract ServicoResponse fromEntity(Servico servico);

    @Named("getEstabelecimento")
    Estabelecimento getEstabelecimento(UUID estabelecimentoId) {
        if ( estabelecimentoId == null ) {
            return null;
        }

        return estabelecimentoRepository.findById(estabelecimentoId)
                .orElseThrow(() -> new EntityNotFoundException("Estabelecimento não encontrado: " + estabelecimentoId));
    }

}
