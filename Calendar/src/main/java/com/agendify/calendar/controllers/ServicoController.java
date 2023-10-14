package com.agendify.calendar.controllers;

import com.agendify.domain.records.ServicoCreate;
import com.agendify.domain.mappers.ServicoMapper;
import com.agendify.domain.records.ServicoResponse;
import com.agendify.calendar.services.ServicoService;
import com.agendify.domain.entities.Servico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/servico")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @Autowired
    private ServicoMapper servicoMapper;

    @PostMapping
    public ResponseEntity<ServicoResponse> createServico(@RequestBody ServicoCreate servicoRequest) throws URISyntaxException {
        Servico entity = servicoMapper.toEntity(servicoRequest);
        Servico servico = servicoService.createServico(entity);
        return ResponseEntity.created(new URI("/servico/" + servico.getId().toString()))
                .body(servicoMapper.fromEntity(servico));
    }
}
