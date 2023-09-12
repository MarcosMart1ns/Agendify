package com.agendify.users.controllers;

import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.mappers.PeriodoAtendimentoMapper;
import com.agendify.domain.records.Estabelecimento;
import com.agendify.domain.records.PeriodoAtendimentoDTO;
import com.agendify.users.services.PeriodoAtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/periodoAtendimento")
public class PeriodoAtendimentoController {

    @Autowired
    private PeriodoAtendimentoService periodoAtendimentoService;

    @Autowired
    private PeriodoAtendimentoMapper periodoAtendimentoMapper;

    @PostMapping
    @ResponseBody
    public ResponseEntity<PeriodoAtendimentoDTO> createPeriodoAtendimento(
            @RequestBody PeriodoAtendimentoDTO periodoAtendimentoRequest) throws URISyntaxException {
        PeriodoAtendimento periodoAtendimentoCreated = periodoAtendimentoService
                .createPeriodoAtendimento(periodoAtendimentoMapper.toEntity(periodoAtendimentoRequest));
        return ResponseEntity.created(
                new URI("/periodoAtendimento/" + periodoAtendimentoCreated.getId().toString()))
                .body(periodoAtendimentoMapper.fromEntity(periodoAtendimentoCreated));
    }
//
//    @GetMapping
//    public List<Estabelecimento> searchEstabelecimentos(@RequestParam("searchText") String searchText){
//        return periodoAtendimentoService.searchEstabelecimento(searchText);
//    }
//
//    @PatchMapping("{id}")
//    @ResponseBody
//    public ResponseEntity<Estabelecimento> updateEstabelecimento(@PathVariable UUID id, @RequestBody Estabelecimento estabelecimento) {
//
//        Estabelecimento estabelecimentoUpdated = periodoAtendimentoService.updateEstabelecimento(id, estabelecimento);
//
//        if (estabelecimentoUpdated == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        return ResponseEntity.ok(estabelecimentoUpdated);
//    }
}
