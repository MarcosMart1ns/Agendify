package com.agendify.domain.repositories;

import com.agendify.domain.entities.PeriodoAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PeriodoAtendimentoRepository extends JpaRepository<PeriodoAtendimento, UUID> {

    List<PeriodoAtendimento> findByEstabelecimento_Id(UUID id);
}