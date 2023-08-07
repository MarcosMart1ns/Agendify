package com.agendify.webapp.security.records;

public record AuthResponse(
        String email,
        String token
) {
}
