package com.agendify.domain.mappers;

import com.agendify.domain.records.Estabelecimento;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface EstabelecimentoMapper {

    Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);

    com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);
}
