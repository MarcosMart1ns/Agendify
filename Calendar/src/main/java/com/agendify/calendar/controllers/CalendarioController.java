package com.agendify.calendar.controllers;

import com.agendify.calendar.controllers.exception.HorarioIndisponivelException;
import com.agendify.calendar.controllers.mappers.AgendamentoCreate;
import com.agendify.calendar.controllers.mappers.AgendamentoMapper;
import com.agendify.calendar.controllers.mappers.AgendamentoResponse;
import com.agendify.calendar.services.CalendarioService;
import com.agendify.domain.entities.Agendamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/agenda")
public class CalendarioController {

    @Autowired
    private CalendarioService calendarioService;

    @Autowired
    private AgendamentoMapper agendamentoMapper;

    @GetMapping("/{id}")
    public ResponseEntity<List<AgendamentoResponse>> getUserCalendar(@PathVariable UUID id) {
        List<Agendamento> agendamentos = calendarioService.findCalendario(id);
        return ResponseEntity.ok(agendamentos.stream()
                        .map(a -> agendamentoMapper.fromEntity(a))
                        .collect(Collectors.toList())
        );
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponse> createAgendamento(
            @RequestBody AgendamentoCreate agendamentoRequest) throws URISyntaxException, HorarioIndisponivelException {
        Agendamento agendamento = calendarioService.createAgendamento(agendamentoMapper.toEntity(agendamentoRequest));
        return ResponseEntity.created(new URI("/agenda/" + agendamento.getId().toString()))
                .body(agendamentoMapper.fromEntity(agendamento));
    }
}
