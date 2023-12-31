package com.agendify.domain.repositories;

import com.agendify.domain.entities.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {

    @Query("SELECT a FROM Agendamento a " +
            "WHERE (a.cliente.id = :id OR a.estabelecimento.id = :id) " +
            "AND CAST(a.data as date) >= CURRENT_DATE")
    List<Agendamento> findAgendamentoByUserIdOrEstabelecimentoId(@Param("id") UUID id);

    @Query("SELECT a FROM Agendamento a " +
            "WHERE (a.cliente.id = :id OR a.estabelecimento.id = :id) " +

            "AND FUNCTION('YEAR', a.data) = FUNCTION('YEAR', :data) " +
            "AND FUNCTION('MONTH', a.data) = FUNCTION('MONTH', :data) " +
            "AND a.status = com.agendify.domain.entities.Status.AGENDADO")
    List<Agendamento> findAgendamentoByUserIdOrEstabelecimentoIdAndMonthYear(@Param("id") UUID id,
                                                                             @Param("data") Date data);

    @Query(value = "SELECT a.* FROM agendamento a " +
            "JOIN servico s ON a.servico_id = s.id " +
            "WHERE :horaInicio >= a.data " +
            "AND :horaInicio <= ADDTIME(a.data, s.duracao)" +
            "AND a.estabelecimento_id = :estabelecimentoId "+
            "AND a.status = 0 ",nativeQuery = true)
    List<Agendamento> findAgendamentosDisponiveis(
            @Param("horaInicio") Date horaInicio,
            @Param("estabelecimentoId") UUID estabelecimentoId);

    @Query("SELECT a FROM Agendamento a WHERE (a.cliente.id = :id or a.estabelecimento.id = :id) " +
            " AND a.status = com.agendify.domain.entities.Status.AGENDADO " +
            "AND date(a.data) = date(:data)")
    List<Agendamento> findAgendamentosPorData(@Param("id") UUID id, @Param("data") Date date);

    @Query("SELECT a FROM Agendamento a WHERE a.status = com.agendify.domain.entities.Status.AGENDADO AND a.data < CURRENT_DATE")
    List<Agendamento> findAgendamentosAbertosAntesDaDataAtual();
}
