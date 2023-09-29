package com.agendify.domain.mappers;

import com.agendify.domain.records.Estabelecimento;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public abstract class EstabelecimentoMapper {

    public abstract Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);

    public abstract com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);

}
