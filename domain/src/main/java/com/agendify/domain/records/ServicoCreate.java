package com.agendify.domain.records;

import com.agendify.domain.entities.Estabelecimento;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.sql.Time;
import java.util.UUID;

public record ServicoCreate(
        UUID estabelecimentoId,
        String nome,
        Time duracao
) {
}
