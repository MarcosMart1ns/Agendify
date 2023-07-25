package com.agendify.users.controllers;

import com.agendify.domain.records.Estabelecimento;
import com.agendify.users.services.EstabelecimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/estabelecimento")
public class EstabelecimentoController {

    @Autowired
    private EstabelecimentoService estabelecimentoService;

    @GetMapping("/{id}")
    @ResponseBody
    public Estabelecimento getEstabelecimento(@PathVariable UUID id) {
        return estabelecimentoService.findEstabelecimento(id);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Estabelecimento> createEstabelecimento(@RequestBody Estabelecimento estabelecimento) throws URISyntaxException {
        Estabelecimento estabelecimentoCreated = estabelecimentoService.createEstabelecimento(estabelecimento);
        return ResponseEntity.created(new URI("/estabelecimento/" + estabelecimentoCreated.id().toString())).body(estabelecimentoCreated);
    }

    @GetMapping
    public List<Estabelecimento> findEstabelecimentos(@RequestParam("searchText") String searchText){
        return estabelecimentoService.searchEstabelecimento(searchText);
    }
}
