package com.agendify.users.services;

import com.agendify.domain.mappers.EstabelecimentoMapper;
import com.agendify.domain.records.Estabelecimento;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.users.exceptions.UserAlreadyExistsException;
import com.agendify.users.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EstabelecimentoService {

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private EstabelecimentoMapper estabelecimentoMapper;

    public Estabelecimento findEstabelecimento(UUID id) throws UserNotFoundException {
        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return estabelecimentoMapper.fromEntity(estabelecimento);
    }

    public Estabelecimento createEstabelecimento(Estabelecimento estabelecimento) throws UserAlreadyExistsException {
        if(estabelecimentoRepository.findByEmail(estabelecimento.email()) !=null){
            throw new UserAlreadyExistsException("Usuário já existe, tente utilizar outro e-mail");
        }

        com.agendify.domain.entities.Estabelecimento estabelecimentoCreated = estabelecimentoRepository.save(estabelecimentoMapper.toEntity(estabelecimento));
        return estabelecimentoMapper.fromEntity(estabelecimentoCreated);
    }

    public List<Estabelecimento> searchEstabelecimento(String searchText) {

        List<com.agendify.domain.entities.Estabelecimento> nome = estabelecimentoRepository.findByNome(searchText);

        List<com.agendify.domain.entities.Estabelecimento> descricao = estabelecimentoRepository.findByDescricao(searchText);
        //TODO: findByServiços
//        List<com.agendify.domain.entities.Estabelecimento> servicos = estabelecimentoRepository.findByServicos(searchText);

        List<com.agendify.domain.entities.Estabelecimento> result = new ArrayList<>();

        result.addAll(nome);
        result.addAll(descricao);


        return result
                .stream()
                .map(estabelecimento -> estabelecimentoMapper.fromEntity(estabelecimento))
                .toList();
    }

    public Estabelecimento updateEstabelecimento(UUID id, Estabelecimento estabelecimento) throws HttpClientErrorException.NotFound {
        if (estabelecimentoRepository.existsById(id)) {
            com.agendify.domain.entities.Estabelecimento estabelecimentoSaved = estabelecimentoRepository.saveAndFlush(estabelecimentoMapper.toEntity(estabelecimento));

            return estabelecimentoMapper.fromEntity(estabelecimentoSaved);
        }
        return null;
    }

}
