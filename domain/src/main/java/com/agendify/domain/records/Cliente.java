package com.agendify.domain.records;

import java.util.UUID;

public record Cliente(
        UUID id,
        String nome,
        String urlFotoPerfil,
        String email,
        String senha,
        Long tipo,
        Endereco endereco,
        String cpf
) {
}
