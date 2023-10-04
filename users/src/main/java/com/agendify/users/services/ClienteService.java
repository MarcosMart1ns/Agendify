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

    public Cliente find(UUID id) throws UserNotFoundException {
        com.agendify.domain.entities.Cliente cliente = clienteRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return clienteMapper.fromEntity(cliente);
    }

    public Cliente createCliente(Cliente cliente) throws UserAlreadyExistsException {

        emailAlreadyExistValidation(cliente.email());

        com.agendify.domain.entities.Cliente clientEntity = clienteMapper.toEntity(cliente);
        clientEntity.setSenha(encryptSenha(clientEntity.getSenha()));

        com.agendify.domain.entities.Cliente clienteSaved = clienteRepository.saveAndFlush(clientEntity);
        return clienteMapper.fromEntity(clienteSaved);
    }

    public Cliente updateCliente(UUID id, Cliente cliente) throws NotFound, UserAlreadyExistsException {

        emailAlreadyExistValidation(cliente.email(), id);

        if (clienteRepository.existsById(id)) {

            com.agendify.domain.entities.Cliente entity = clienteMapper.toEntity(cliente);
            entity.setId(id);

            com.agendify.domain.entities.Cliente clienteSaved = clienteRepository.saveAndFlush(entity);

            return clienteMapper.fromEntity(clienteSaved);
        }
        return null;
    }

    public void emailAlreadyExistValidation(String email) throws UserAlreadyExistsException {
        emailAlreadyExistValidation(email, null);
    }

    public void emailAlreadyExistValidation(String email, UUID id) throws UserAlreadyExistsException {
        com.agendify.domain.entities.Cliente cliente = clienteRepository.findByEmail(email);

        if (cliente != null) {
            if ((cliente.getId().equals(id))) {
                return;
            }

            log.error("Email {} já possui cadastro e pertence a outro usuário", email);
            throw new UserAlreadyExistsException("Email já utilizado por outro usuário, escolha outro email.");
        }
    }

    String encryptSenha(String senha) {
        return new BCryptPasswordEncoder(16).encode(senha);
    }
}
