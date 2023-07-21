package com.agendify.domain.records;

import java.util.UUID;

public record Endereco(
        UUID Id,
        String logradouro,
        String bairro,
        Cidade cidade,
        Long numero,
        String Complemento,
        String cep
) {
}
