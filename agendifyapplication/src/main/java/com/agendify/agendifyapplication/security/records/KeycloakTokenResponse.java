package com.agendify.agendifyapplication.security.records;

public record KeycloakTokenResponse(
        String access_token,
        String expires_in,
        String refresh_expires_in,
        String token_type,
        String not_before_policy,
        String scope
) {
}
