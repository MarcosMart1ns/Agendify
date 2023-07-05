package com.agendify.domain.repositories;

import com.agendify.domain.entities.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EstadoRepository extends JpaRepository<Estado, UUID> {

}