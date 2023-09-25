package com.agendify.domain.mappers;

import com.agendify.domain.records.Estabelecimento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Mapper(componentModel = "spring")
public abstract class EstabelecimentoMapper {

    public abstract Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);

    public abstract com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);

}
