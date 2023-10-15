package com.agendify.agendifyapplication.security.service;

import com.agendify.domain.entities.Usuario;
import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.agendifyapplication.security.exceptions.InvalidCredentialsException;
import com.agendify.agendifyapplication.security.exceptions.RequestTokenException;
import com.agendify.agendifyapplication.security.records.AuthRequest;
import com.agendify.agendifyapplication.security.records.AuthResponse;
import com.agendify.agendifyapplication.security.records.KeycloakTokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.configurers.provisioning.UserDetailsManagerConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@Service
public class AuthService implements UserDetailsService {

    Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final RestTemplate restTemplate = new RestTemplate();

    private final String EMAIL_SENHA_INVALIDOS = "Email ou senha incorretos, verique os dados informados e tente novamente";

    final String ERROR_MSG = "Erro ao obter ao token de acesso, verifique o client id e/ou secret id";

    final String GENERIC_ERROR_MSG = "Erro genérico ao obter ao token de acesso";

    @Autowired
    JwtService jwtService;

    public AuthResponse handleAuthRequest(AuthRequest authRequest) throws InvalidCredentialsException, RequestTokenException {
        if (authRequest.password() == null)
            throw new InvalidCredentialsException("O campo password não foi informado");

        logger.info("Verificando dados de login do usuário {}", authRequest.email());

        Usuario usuario = clienteRepository.findByEmail(authRequest.email());

        if (usuario == null) {
            usuario = estabelecimentoRepository.findByEmail(authRequest.email());
        }

        checkPassword(authRequest, usuario);

        String token = jwtService.generateToken(usuario);

        return new AuthResponse(usuario.getId().toString(), usuario.getEmail(), token, usuario.getTipo());
    }

    private void checkPassword(AuthRequest authRequest, Usuario usuario) throws InvalidCredentialsException {
        logger.info("Verificando senha fornecida");

        if (usuario == null) {
            logger.debug("Usuario {} inválido", authRequest.email());
            throw new InvalidCredentialsException(EMAIL_SENHA_INVALIDOS);
        }

        boolean isPasswordValid = passwordEncoder.matches(authRequest.password(), usuario.getSenha());

        if (!isPasswordValid) {
            logger.debug("Senha inválida");
            throw new InvalidCredentialsException(EMAIL_SENHA_INVALIDOS);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = clienteRepository.findByEmail(username);

        if (usuario == null) {
            usuario = estabelecimentoRepository.findByEmail(username);
        }

        return Optional
                .of(usuario)
                .map(UserDetail::new)
                .orElseThrow(()->new UsernameNotFoundException("Usuário não encontrado pelo Security"));
    }

}
