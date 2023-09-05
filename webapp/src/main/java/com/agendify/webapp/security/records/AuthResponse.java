package com.agendify.webapp.security.records;

public record AuthResponse(
        String id,
        String email,
        String token
) {
}
