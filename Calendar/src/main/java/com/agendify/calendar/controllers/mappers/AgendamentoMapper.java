package com.agendify.calendar.controllers.mappers;

import com.agendify.domain.entities.Agendamento;
import com.agendify.domain.entities.Cliente;
import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.entities.Servico;
import com.agendify.domain.mappers.ClienteMapper;
import com.agendify.domain.mappers.EstabelecimentoMapper;
import com.agendify.domain.records.ClienteResponse;
import com.agendify.domain.records.EstabelecimentoResponse;
import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.domain.repositories.ServicoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(componentModel = "spring")
public abstract class AgendamentoMapper {

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ServicoMapper servicoMapper;

    @Autowired
    private EstabelecimentoMapper estabelecimentoMapper;

    @Autowired
    private ClienteMapper clienteMapper;

    @Mappings({
            @Mapping(target = "estabelecimento", source = "estabelecimentoId", qualifiedByName = "getEstabelecimento"),
            @Mapping(target = "cliente", source = "clienteId", qualifiedByName = "getCliente"),
            @Mapping(target = "servico", source = "servicoId", qualifiedByName = "getServico")
    })
    public abstract Agendamento toEntity(AgendamentoCreate agendamentoCreate);

    @Mappings({
//            @Mapping(target = "estabelecimentoId", source = "estabelecimento.id"),
//            @Mapping(target = "clienteId", source = "cliente.id"),
            @Mapping(target = "estabelecimento", source = "estabelecimento", qualifiedByName = "mapEstabelecimentoResponse"),
            @Mapping(target = "cliente", source = "cliente", qualifiedByName = "mapClienteResponse"),
            @Mapping( target = "servico", source = "servico", qualifiedByName = "mapServicoResponse")
    })
    public abstract AgendamentoResponse fromEntity(Agendamento agendamento);

    @Named("getEstabelecimento")
    Estabelecimento getEstabelecimento(UUID uuid) {
        return estabelecimentoRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Estabelecimento não encontrado: " + uuid));
    }

    @Named("getServico")
    Servico getServico(UUID uuid) {
        return servicoRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Servico não encontrado: " + uuid));
    }

    @Named("getCliente")
    Cliente getCliente(UUID uuid) {
        return clienteRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado: " + uuid));
    }

    @Named("mapServicoResponse")
    ServicoResponse mapServicoResponse(Servico servico){
        return servicoMapper.fromEntity(servico);
    }

    @Named("mapEstabelecimentoResponse")
    EstabelecimentoResponse mapEstabelecimentoResponse(Estabelecimento estabelecimento){
        return estabelecimentoMapper.toEstabelecimentoResponse(estabelecimento);
    }

    @Named("mapClienteResponse")
    ClienteResponse mapClienteResponse(Cliente cliente){
        return clienteMapper.toClienteResponse(cliente);
    }

}
