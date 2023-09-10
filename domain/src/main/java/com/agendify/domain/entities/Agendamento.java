package com.agendify.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, unique = true, nullable = false)
    private UUID id;

    @ManyToOne
    private com.agendify.domain.entities.Estabelecimento estabelecimento;

    @ManyToOne
    private com.agendify.domain.entities.Cliente cliente;

    @ManyToOne
    private com.agendify.domain.entities.Servico servico;

    private Date data;

    private Status status;

    @Transient
    public Date getHorarioFinal() {
        LocalDateTime inicio = data.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
        LocalTime duracao = servico.getDuracao().toLocalTime();
        Duration duracaoTotal = Duration.ofHours(duracao.getHour()).plusMinutes(duracao.getMinute());

        LocalDateTime fim = inicio.plus(duracaoTotal);

        return Date.from(fim.atZone(ZoneId.systemDefault()).toInstant());
    }
}
