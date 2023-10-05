package com.agendify.domain.repositories;

import com.agendify.domain.entities.Estabelecimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, UUID> {

    List<Estabelecimento> findByNome(String nome);

    List<Estabelecimento> findByDescricao(String nome);

    Estabelecimento findByEmail(String email);

    Optional<Estabelecimento> findById(UUID estabelecimentoId);

    @Query("SELECT DISTINCT e FROM Estabelecimento e " +
            "LEFT JOIN e.servicos s " +
            "WHERE LOWER(e.nome) LIKE LOWER(CONCAT('%', :textoPesquisa, '%')) " +
            "OR LOWER(e.descricao) LIKE LOWER(CONCAT('%', :textoPesquisa, '%')) " +
            "OR LOWER(s.nome) LIKE LOWER(CONCAT('%', :textoPesquisa, '%'))")
    List<Estabelecimento> findByNomeOrDescricaoOrNomeServico(@Param("textoPesquisa") String textoPesquisa);
}