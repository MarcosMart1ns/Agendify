package com.agendify.calendar.controllers;

import com.agendify.calendar.controllers.mappers.AgendamentoCreate;
import com.agendify.calendar.controllers.mappers.AgendamentoMapper;
import com.agendify.calendar.services.CalendarioService;
import com.agendify.domain.entities.Agendamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/agenda")
public class CalendarioController {

    @Autowired
    private CalendarioService calendarioService;

    @Autowired
    private AgendamentoMapper agendamentoMapper;

    @GetMapping("/{id}")
    public ResponseEntity<List<Agendamento>> getUserCalendar(@PathVariable UUID id){
        List<Agendamento> agendamentos = calendarioService.findCalendario(id);
        return ResponseEntity.ok(agendamentos);
    }

    @PostMapping
    public ResponseEntity<Agendamento> createAgendamento(@RequestBody AgendamentoCreate agendamento){
        calendarioService.createAgendamento(agendamentoMapper.toEntity(agendamento));

        return null;
    }
}
