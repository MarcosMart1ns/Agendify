package com.agendify.domain.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Estabelecimento extends Usuario {

    private String cpnj;

    private String descricao;

    @OneToMany
    private List<Servico> servicos;

    @OneToMany(mappedBy = "periodoatendimento_id")
    private List<PeriodoAtendimento> periodosAtendimento;
}
