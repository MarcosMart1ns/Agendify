package com.agendify.users.services;

import com.agendify.domain.mappers.EstabelecimentoMapper;
import com.agendify.domain.records.Estabelecimento;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.users.exceptions.InsufficientSearchArguments;
import com.agendify.users.exceptions.UserAlreadyExistsException;
import com.agendify.users.exceptions.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EstabelecimentoService {

    Logger log = LoggerFactory.getLogger(EstabelecimentoService.class);

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private EstabelecimentoMapper estabelecimentoMapper;

    public Estabelecimento findEstabelecimento(UUID id) throws UserNotFoundException {
        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return estabelecimentoMapper.fromEntity(estabelecimento);
    }

    public Estabelecimento createEstabelecimento(Estabelecimento estabelecimento) throws UserAlreadyExistsException {

        emailAlreadyExistValidation(estabelecimento.email());

        com.agendify.domain.entities.Estabelecimento estabelecimentoEntity = estabelecimentoMapper.toEntity(estabelecimento);
        estabelecimentoEntity.setSenha(encryptSenha(estabelecimentoEntity.getSenha()));

        com.agendify.domain.entities.Estabelecimento estabelecimentoCreated = estabelecimentoRepository.save(estabelecimentoEntity);
        return estabelecimentoMapper.fromEntity(estabelecimentoCreated);
    }

    public List<Estabelecimento> searchEstabelecimento(String searchText) throws InsufficientSearchArguments {
        if(searchText.length() < 5){
            throw new InsufficientSearchArguments();
        }

        List<com.agendify.domain.entities.Estabelecimento> result = new ArrayList<>(estabelecimentoRepository.findByNomeOrDescricaoOrNomeServico(searchText));

        return result
                .stream()
                .map(estabelecimento -> estabelecimentoMapper.fromEntity(estabelecimento))
                .toList();
    }

    public Estabelecimento updateEstabelecimento(UUID id, Estabelecimento estabelecimento) throws HttpClientErrorException.NotFound, UserAlreadyExistsException {

        emailAlreadyExistValidation(estabelecimento.email(), id);

        if (estabelecimentoRepository.existsById(id)) {

            com.agendify.domain.entities.Estabelecimento entity = estabelecimentoMapper.toEntity(estabelecimento);
            entity.setId(id);
            com.agendify.domain.entities.Estabelecimento estabelecimentoSaved = estabelecimentoRepository.saveAndFlush(entity);
            return estabelecimentoMapper.fromEntity(estabelecimentoSaved);
        }
        return null;
    }

    public void emailAlreadyExistValidation(String email) throws UserAlreadyExistsException {
        emailAlreadyExistValidation(email, null);
    }

    public void emailAlreadyExistValidation(String email, UUID id) throws UserAlreadyExistsException {
        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.findByEmail(email);

        if (estabelecimento != null) {
            if (estabelecimento.getId().equals(id)) {
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
