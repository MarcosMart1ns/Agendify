package com.agendify.agendifyapplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class JacksonConfig {
    @Bean
    public Jackson2ObjectMapperBuilder objectMapperBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        builder.simpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // Define o formato de data e hora
        builder.timeZone("UTC"); // Define o fuso horário como UTC
        return builder;
    }
}
