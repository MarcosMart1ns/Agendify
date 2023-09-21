package com.agendify.agendifyapplication.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("com.agendify.domain.repositories")
@EntityScan("com.agendify.domain.entities")
@ComponentScan({"com.agendify.domain", "com.agendify.users","com.agendify.calendar"})
public class WebConfig {
}
