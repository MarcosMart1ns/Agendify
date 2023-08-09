package com.agendify.webapp.security.records;

public record AuthRequest(
        String email,
        String password
) {
}
