package com.agendify.agendifyapplication.security.records;

public record AuthRequest(
        String email,
        String password
) {
}
