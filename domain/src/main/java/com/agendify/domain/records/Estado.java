package com.agendify.domain.records;

import java.util.List;
import java.util.UUID;

public record Estado(
        UUID Id,
        String Nome,
        List<Cidade> cidades
) {
}
