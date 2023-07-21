package com.agendify.domain.records;

import java.util.UUID;

public record Cidade(
        UUID Id,
        String nome,
        Estado estado) {
}
