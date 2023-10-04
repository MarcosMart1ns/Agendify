package com.agendify.domain.entities;


import jakarta.annotation.Nonnull;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class Estabelecimento extends Usuario {

    public Estabelecimento() {
        super.setTipo(2L);
    }

    @Nonnull
    @Column(length = 14)
    private String cnpj;

    @Column(length = 1000)
    private String descricao;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Servico> servicos;

    @OneToMany(cascade = CascadeType.ALL)
    private List<PeriodoAtendimento> periodosAtendimento;
}
