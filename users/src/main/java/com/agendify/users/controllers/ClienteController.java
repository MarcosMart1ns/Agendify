package com.agendify.users.controllers;

import com.agendify.domain.records.Cliente;
import com.agendify.users.exceptions.UserAlreadyExistsException;
import com.agendify.users.exceptions.UserNotFoundException;
import com.agendify.users.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/{id}")
    @ResponseBody
    public Cliente getCliente(@PathVariable UUID id) throws UserNotFoundException {
        return clienteService.find(id);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) throws URISyntaxException, UserAlreadyExistsException {
        Cliente clienteCreated = clienteService.createCliente(cliente);
        return ResponseEntity.created(new URI("/cliente/" + clienteCreated.id().toString())).body(clienteCreated);
    }

    @PatchMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Cliente> updateCliente(@PathVariable UUID id, @RequestBody Cliente cliente) throws UserAlreadyExistsException {

        Cliente clienteUpdated = clienteService.updateCliente(id, cliente);

        if (clienteUpdated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(clienteUpdated);
    }

}
