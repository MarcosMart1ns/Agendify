package com.agendify.users.controllers;

import com.agendify.domain.records.Estabelecimento;
import com.agendify.users.exceptions.InsufficientSearchArguments;
import com.agendify.users.exceptions.UserAlreadyExistsException;
import com.agendify.users.exceptions.UserNotFoundException;
import com.agendify.users.services.EstabelecimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    public Estabelecimento getEstabelecimento(@PathVariable UUID id) throws UserNotFoundException {
        return estabelecimentoService.findEstabelecimento(id);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Estabelecimento> createEstabelecimento(@RequestBody Estabelecimento estabelecimento) throws URISyntaxException, UserAlreadyExistsException {
        Estabelecimento estabelecimentoCreated = estabelecimentoService.createEstabelecimento(estabelecimento);
        return ResponseEntity.created(new URI("/estabelecimento/" + estabelecimentoCreated.id().toString())).body(estabelecimentoCreated);
    }

    @GetMapping
    public List<Estabelecimento> searchEstabelecimentos(@RequestParam("searchText") String searchText) throws InsufficientSearchArguments {
        return estabelecimentoService.searchEstabelecimento(searchText);
    }

    @PatchMapping("{id}")
    @ResponseBody
    public ResponseEntity<Estabelecimento> updateEstabelecimento(@PathVariable UUID id, @RequestBody Estabelecimento estabelecimento) throws UserAlreadyExistsException {

        Estabelecimento estabelecimentoUpdated = estabelecimentoService.updateEstabelecimento(id, estabelecimento);

        if (estabelecimentoUpdated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(estabelecimentoUpdated);
    }
}
