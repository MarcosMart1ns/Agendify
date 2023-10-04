package com.agendify.agendifyapplication.security.controller;

import com.agendify.agendifyapplication.security.exceptions.InvalidCredentialsException;
import com.agendify.agendifyapplication.security.exceptions.RequestTokenException;
import com.agendify.agendifyapplication.security.records.AuthRequest;
import com.agendify.agendifyapplication.security.records.AuthResponse;
import com.agendify.agendifyapplication.security.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) throws RequestTokenException, InvalidCredentialsException {

        AuthResponse authResponse = authService.handleAuthRequest(authRequest);
        return ResponseEntity.accepted().body(authResponse);
    }

}
