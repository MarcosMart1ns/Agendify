package com.agendify.domain.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Estabelecimento extends Usuario {

    private String cpnj;

    private String descricao;

    @OneToMany
    private List<Servico> servicos;

    @OneToMany
    private List<PeriodoAtendimento> periodosAtendimento;
}
