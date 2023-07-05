package com.agendify.domain.repositories;

import com.agendify.domain.entities.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, UUID> {

}
