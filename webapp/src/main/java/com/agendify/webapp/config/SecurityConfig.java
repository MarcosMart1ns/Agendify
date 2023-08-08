package com.agendify.webapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain web(HttpSecurity http) throws Exception {

        http.
                csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry -> authorizationManagerRequestMatcherRegistry
                                .requestMatchers(HttpMethod.GET, "/cliente/{id}").authenticated()
                                .requestMatchers(HttpMethod.GET, "/estatabelecimento/{id}").authenticated()
                                .anyRequest().permitAll()
                );

        http.oauth2ResourceServer().jwt(Customizer.withDefaults());

        //TODO: Verificar tratamento quando o token expira, neste cenário a aplicação retona 500 em um nullpointer
        //TODO: Inserir verificações em cenários de erro
        //TODO: Fazer docker compose com keycloak já inserindo o realm necessário
        //TODO: Inserir limitação de acesso a clientes e estabelecimento
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
