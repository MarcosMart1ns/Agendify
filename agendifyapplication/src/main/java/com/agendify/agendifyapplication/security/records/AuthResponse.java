package com.agendify.agendifyapplication.security.records;

public record AuthResponse(
        String id,
        String email,
        String token,

        Long tipo
) {
}
