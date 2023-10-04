package com.agendify.domain.entities;


import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class Cliente extends Usuario {

    @Nonnull
    @Column(length = 11)
    private String cpf;

    public Cliente() {
        super.setTipo(1L);
    }
}
