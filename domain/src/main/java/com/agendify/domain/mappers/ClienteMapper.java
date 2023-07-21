package com.agendify.domain.mappers;

import com.agendify.domain.records.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ClienteMapper {

    ClienteMapper INSTANCE = Mappers.getMapper(ClienteMapper.class );

    Cliente fromEntity(com.agendify.domain.entities.Cliente cliente);

    com.agendify.domain.entities.Usuario toEntity(Cliente usuario);
}
