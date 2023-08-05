package com.agendify.calendar.controllers.mappers;

import com.agendify.domain.entities.Agendamento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public abstract class AgendamentoMapper {

    @Mappings({
            @Mapping(target = "estabelecimento.id", source="estabelecimentoId"),
            @Mapping(target = "cliente.id", source = "clienteId"),
            @Mapping(target = "servico.id", source = "servicoId")
    })
    public abstract Agendamento toEntity(AgendamentoCreate agendamentoCreate);

}
