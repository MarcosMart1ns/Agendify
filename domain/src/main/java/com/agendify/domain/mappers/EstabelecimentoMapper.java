package com.agendify.domain.mappers;

import com.agendify.domain.records.*;
import com.agendify.domain.records.EstabelecimentoResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class EstabelecimentoMapper {

    public abstract Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);

    public abstract EstabelecimentoResponse toEstabelecimentoResponse(com.agendify.domain.entities.Estabelecimento estabelecimento);


//    @Mapping(target = "senha", source = "senha", qualifiedByName = "encryptSenha")
    public abstract com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);

}
