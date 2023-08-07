package com.agendify.webapp.security.service;

import com.agendify.domain.entities.Usuario;
import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.webapp.security.records.AuthRequest;
import com.agendify.webapp.security.records.AuthResponse;
import com.agendify.webapp.security.records.KeycloakTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class AuthService {

    @Autowired
    private ClienteRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Value("${spring.security.oauth2.client.provider.keycloak.token-uri}")
    private String verifyTokenUrl;

    @Value("${spring.security.oauth2.client.registration.keycloak.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.keycloak.clientSecret}")
    private String clientSecret;

    private final RestTemplate restTemplate = new RestTemplate();

    public AuthResponse handleAuthRequest(AuthRequest authRequest) throws Exception {

        Usuario usuario = usuarioRepository.findByEmail(authRequest.email());

        checkPassword(authRequest, usuario);

        String token = getToken();

        return new AuthResponse(usuario.getEmail(), token);
    }

    private void checkPassword(AuthRequest authRequest, Usuario usuario) throws Exception {
        if (usuario == null) {
            throw new Exception("Wrong email or password");
        }

        boolean isPasswordValid = passwordEncoder.matches(authRequest.password(), usuario.getSenha());

        if (!isPasswordValid) {
            throw new Exception("Wrong email or password");
        }
    }

    private String getToken() throws Exception {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type", "client_credentials");

        HttpEntity<Object> request = new HttpEntity<>(map, headers);

        ResponseEntity<KeycloakTokenResponse> response = restTemplate.postForEntity(verifyTokenUrl, request, KeycloakTokenResponse.class);

        if (response.getBody() == null) {
            throw new Exception("Erro ao obter access token");
            //TODO: Especializar exception
        }

        return response.getBody().access_token();
    }
}
