package com.agendify.domain.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
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

    @OneToMany(mappedBy = "periodoatendimento_id")
    private List<PeriodoAtendimento> periodosAtendimento;
}
