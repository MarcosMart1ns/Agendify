package com.agendify.users.services;

import com.agendify.domain.mappers.ClienteMapper;
import com.agendify.domain.records.Cliente;
import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.users.exceptions.UserAlreadyExistsException;
import com.agendify.users.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException.NotFound;

import java.util.UUID;

@Service
public class ClienteService {

    Logger log = LoggerFactory.getLogger(ClienteService.class);

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper;

    @Autowired
    private EmailService emailService;

    public Cliente find(UUID id) throws UserNotFoundException {
        com.agendify.domain.entities.Cliente cliente = clienteRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return clienteMapper.fromEntity(cliente);
    }

    public Cliente createCliente(Cliente cliente) throws UserAlreadyExistsException {

        emailService.emailAlreadyExistValidation(cliente.email());

        com.agendify.domain.entities.Cliente clientEntity = clienteMapper.toEntity(cliente);
        clientEntity.setSenha(encryptSenha(clientEntity.getSenha()));

        com.agendify.domain.entities.Cliente clienteSaved = clienteRepository.saveAndFlush(clientEntity);
        return clienteMapper.fromEntity(clienteSaved);
    }

    public Cliente updateCliente(UUID id, Cliente cliente) throws NotFound, UserAlreadyExistsException {

        emailService.emailAlreadyExistValidation(cliente.email(), id);

        if (clienteRepository.existsById(id)) {

            com.agendify.domain.entities.Cliente entity = clienteMapper.toEntity(cliente);
            entity.setId(id);

            com.agendify.domain.entities.Cliente clienteSaved = clienteRepository.saveAndFlush(entity);

            return clienteMapper.fromEntity(clienteSaved);
        }
        return null;
    }

    String encryptSenha(String senha) {
        return new BCryptPasswordEncoder(16).encode(senha);
    }
}
