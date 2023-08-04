package com.agendify.domain.mappers;

import com.agendify.domain.records.Estabelecimento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.bcrypt.BCrypt;


@Mapper(componentModel = "spring")
public abstract class EstabelecimentoMapper {

    public abstract Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);

    @Mapping(target = "senha", source = "senha", qualifiedByName = "decryptSenha")
    public abstract com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);

    @Named("decryptSenha")
    String decryptId(String senha) {
        return BCrypt.hashpw(senha, BCrypt.gensalt(4));
    }
}
