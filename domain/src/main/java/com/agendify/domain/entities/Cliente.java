package com.agendify.domain.entities;


import jakarta.persistence.Entity;

@Entity
public class Cliente extends Usuario {

    private String cpf;
}
