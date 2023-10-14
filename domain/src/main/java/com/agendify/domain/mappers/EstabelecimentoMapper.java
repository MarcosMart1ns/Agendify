package com.agendify.domain.mappers;

import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.entities.Servico;
import com.agendify.domain.records.*;
import com.agendify.domain.records.EstabelecimentoResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class EstabelecimentoMapper {

    @Autowired
    PeriodoAtendimentoMapper periodoAtendimentoMapper;

    @Autowired
    ServicoMapper servicoMapper;

    @Mapping(target = "periodosAtendimento", source = "periodosAtendimento", qualifiedByName = "fromPeriodoEntity")
    @Mapping(target = "servicos", source = "servicos", qualifiedByName = "fromServicoEntity")
    public abstract Estabelecimento fromEntity(com.agendify.domain.entities.Estabelecimento estabelecimento);


    public abstract EstabelecimentoResponse toEstabelecimentoResponse(com.agendify.domain.entities.Estabelecimento estabelecimento);

    @Mapping(target = "periodosAtendimento", source = "periodosAtendimento", qualifiedByName = "toPeriodoEntity")
    @Mapping(target = "servicos", source = "servicos", qualifiedByName = "toServicoEntity")
    public abstract com.agendify.domain.entities.Estabelecimento toEntity(Estabelecimento estabelecimento);

    @Named("fromPeriodoEntity")
    List<PeriodoAtendimentoDTO> fromPeriodoEntity(List<PeriodoAtendimento> periodoAtendimento) {
        if (periodoAtendimento == null) {
            return null;
        }
        return periodoAtendimento.stream().map(periodo -> periodoAtendimentoMapper.fromEntity(periodo)).toList();
    }

    @Named("toPeriodoEntity")
    List<PeriodoAtendimento> toPeriodoEntity(List<PeriodoAtendimentoDTO> periodoAtendimento) {
        if (periodoAtendimento == null) {
            return null;
        }
        return periodoAtendimento.stream().map(periodo -> periodoAtendimentoMapper.toEntity(periodo)).toList();
    }

    @Named("fromServicoEntity")
    List<ServicoResponse> fromServicoEntity(List<com.agendify.domain.entities.Servico> servicos) {
        if (servicos == null) {
            return null;
        }
        return servicos.stream().map(periodo -> servicoMapper.fromEntity(periodo)).toList();
    }

    @Named("toServicoEntity")
    List<Servico> toServicoEntity(List<ServicoResponse> servicos) {
        if (servicos == null) {
            return null;
        }
        return servicos.stream().map(periodo -> servicoMapper.toEntity(periodo)).toList();
    }

}
