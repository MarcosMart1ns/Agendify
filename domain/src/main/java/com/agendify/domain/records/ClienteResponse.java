package com.agendify.domain.records;

import java.util.UUID;

public record ClienteResponse(
        UUID id,
        String nome,
        String urlFotoPerfil,
        String email,
        Long tipo,
        Endereco endereco,
        String cpf
) {
}
