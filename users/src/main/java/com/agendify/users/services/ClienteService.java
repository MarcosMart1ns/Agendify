package com.agendify.users.services;

import com.agendify.domain.mappers.ClienteMapper;
import com.agendify.domain.records.Cliente;
import com.agendify.domain.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper;

    public Cliente find(UUID id){
        com.agendify.domain.entities.Cliente cliente = clienteRepository.findById(id).orElse(null);
        return clienteMapper.fromEntity(cliente);
    }

    public Cliente createCliente(Cliente cliente) {
        com.agendify.domain.entities.Cliente clienteSaved = clienteRepository.saveAndFlush(clienteMapper.toEntity(cliente));
        return clienteMapper.fromEntity(clienteSaved);
    }
}
