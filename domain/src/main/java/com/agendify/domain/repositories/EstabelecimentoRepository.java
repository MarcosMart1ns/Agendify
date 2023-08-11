package com.agendify.domain.repositories;

import com.agendify.domain.entities.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, UUID> {

    List<Estabelecimento> findByNome(String nome);

    List<Estabelecimento> findByDescricao(String nome);

    Optional<Estabelecimento> findById(UUID estabelecimentoId);
}