package com.agendify.domain.mappers;

import com.agendify.domain.records.Estabelecimento;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;


@Mapper
public interface EstabelecimentoMapper {

    EstabelecimentoMapper INSTANCE = Mappers.getMapper(EstabelecimentoMapper.class);

    Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);

    com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);
}
