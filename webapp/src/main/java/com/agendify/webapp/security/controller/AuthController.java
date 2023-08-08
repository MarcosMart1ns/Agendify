package com.agendify.webapp.security.controller;

import com.agendify.webapp.security.exceptions.InvalidCredentialsException;
import com.agendify.webapp.security.exceptions.InvalidTokenException;
import com.agendify.webapp.security.records.AuthRequest;
import com.agendify.webapp.security.records.AuthResponse;
import com.agendify.webapp.security.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest){
        try {
            AuthResponse authResponse = authService.handleAuthRequest(authRequest);
            return ResponseEntity.accepted().body(authResponse);
        } catch (InvalidTokenException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
