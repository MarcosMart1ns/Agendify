package com.agendify.users.services;

import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.users.exceptions.UserAlreadyExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class EmailService {

    Logger log = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;


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

        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.findByEmail(email);

        if (estabelecimento != null) {
            if (estabelecimento.getId().equals(id)) {
                return;
            }

            log.error("Email {} já possui cadastro e pertence a outro usuário", email);
            throw new UserAlreadyExistsException("Email já utilizado por outro usuário, escolha outro email.");
        }
    }
}
