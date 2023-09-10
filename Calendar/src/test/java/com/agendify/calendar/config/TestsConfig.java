package com.agendify.calendar.config;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;

@Configuration
@SpringBootConfiguration
@EnableAutoConfiguration
@EnableJpaRepositories("com.agendify.domain.repositories")
@EntityScan("com.agendify.domain.entities")
@ComponentScan({"com.agendify.domain", "com.agendify.calendar"})
@Import(DatabaseTestConfiguration.class)
@ActiveProfiles("test")
public class TestsConfig {

}
