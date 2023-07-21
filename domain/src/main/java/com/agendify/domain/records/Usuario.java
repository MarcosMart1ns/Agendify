package com.agendify.domain.records;

import java.util.UUID;

public record Usuario(
        UUID Id,
        String nome,
        String urlFotoPerfil,
        String email,
        String senha,
        Long tipo,
        Endereco endereco
) {
}
