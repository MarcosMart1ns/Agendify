package com.agendify.domain.mappers;

import com.agendify.domain.records.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.security.crypto.bcrypt.BCrypt;

@Mapper(componentModel = "spring")
public abstract class ClienteMapper {

    public abstract Cliente fromEntity(com.agendify.domain.entities.Cliente cliente);

    @Mapping(target = "senha", source = "senha", qualifiedByName = "decryptSenha")
    public abstract com.agendify.domain.entities.Cliente toEntity(Cliente cliente);


    @Named("decryptSenha")
    String decryptId(String senha) {
        return BCrypt.hashpw(senha, BCrypt.gensalt(4));
    }
}
