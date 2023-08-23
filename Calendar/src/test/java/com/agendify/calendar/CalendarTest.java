package com.agendify.calendar;

import com.agendify.calendar.config.TestsConfig;
import com.agendify.calendar.controllers.mappers.AgendamentoCreate;
import com.agendify.calendar.controllers.mappers.AgendamentoResponse;
import com.agendify.domain.entities.Cliente;
import com.agendify.domain.entities.DiaDaSemana;
import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.entities.PeriodoAtendimento;
import com.agendify.domain.entities.Servico;
import com.agendify.domain.repositories.AgendamentoRepository;
import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.domain.repositories.PeriodoAtendimentoRepository;
import com.agendify.domain.repositories.ServicoRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(classes = TestsConfig.class)
@AutoConfigureMockMvc
public class CalendarTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PeriodoAtendimentoRepository periodoAtendimentoRepository;

    private Estabelecimento estabelecimento;

    private Cliente cliente;

    private Servico servico;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeAll
    void beforeAllTests() {
        this.estabelecimento = createEstabelecimentoEntity();
        this.cliente = createClienteEntity();
        this.servico = createServicoEntity();
    }

    @BeforeEach
    void beforeTests() {
        agendamentoRepository.deleteAll();
    }

    @Test
    @DisplayName("Criar um agendamento válido em um horário disponível")
    void createCalendarTest() throws Exception {
        PeriodoAtendimento periodoAtendimento = PeriodoAtendimento.builder()
                .estabelecimento(estabelecimento)
                .diaDaSemana(DiaDaSemana.fromDayOfWeek(LocalDate.now().getDayOfWeek()))
                .horaInicio(LocalTime.of(0, 0, 0))
                .horaFim(LocalTime.of(23, 59, 59))
                .build();
        periodoAtendimentoRepository.saveAndFlush(periodoAtendimento);

        AgendamentoCreate request = new AgendamentoCreate(
                estabelecimento.getId(),
                cliente.getId(),
                servico.getId(),
                new Date(new Date().getTime() + 60_000));

        String result = mockMvc.perform(
                post("/agenda")
                        .content(parseObjectToJson(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().is2xxSuccessful()).andReturn().getResponse().getContentAsString();
        AgendamentoResponse agendamentoResponse = objectMapper.readValue(result, AgendamentoResponse.class);

        assertEquals(request.estabelecimentoId(), agendamentoResponse.estabelecimentoId());
        assertEquals(request.clienteId(), agendamentoResponse.clienteId());
        assertEquals(request.servicoId(), agendamentoResponse.servico().id());
        assertEquals(servico.getEstabelecimento().getId(), agendamentoResponse.servico().estabelecimentoId());
        assertEquals(servico.getNome(), agendamentoResponse.servico().nome());
        assertEquals(servico.getDuracao(), agendamentoResponse.servico().duracao());
        assertEquals(request.data(), agendamentoResponse.data());
        assertNotNull(agendamentoResponse.id());
    }

    @Test
    @DisplayName("Criar um agendamento que não esteja dentro do periodo de atendimento do prestador")
    void createCalendarTest_foraPeriodoAtendimento() throws Exception {
        PeriodoAtendimento periodoAtendimento = PeriodoAtendimento.builder()
                .estabelecimento(estabelecimento)
                .diaDaSemana(DiaDaSemana.fromDayOfWeek(LocalDate.now().getDayOfWeek()))
                .horaInicio(LocalTime.of(0, 0, 0))
                .horaFim(LocalTime.of(0, 0, 1))
                .build();
        periodoAtendimentoRepository.saveAndFlush(periodoAtendimento);

        AgendamentoCreate request = new AgendamentoCreate(
                estabelecimento.getId(),
                cliente.getId(),
                servico.getId(),
                new Date(new Date().getTime() + 60_000));

        mockMvc.perform(
                        post("/agenda")
                                .content(parseObjectToJson(request))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isConflict())
                .andExpect(jsonPath("$.msg")
                        .value("O horário se encontra fora do periodo de atendimento do prestador"));
    }

    @Test
    @DisplayName("Criar um agendamento em um horário que não esteja disponível")
    void createCalendarTest_horarioIndisponivel() throws Exception {
        PeriodoAtendimento periodoAtendimento = PeriodoAtendimento.builder()
                .estabelecimento(estabelecimento)
                .diaDaSemana(DiaDaSemana.fromDayOfWeek(LocalDate.now().getDayOfWeek()))
                .horaInicio(LocalTime.of(0, 0, 0))
                .horaFim(LocalTime.of(23, 59, 59))
                .build();
        periodoAtendimentoRepository.saveAndFlush(periodoAtendimento);

        AgendamentoCreate request = new AgendamentoCreate(
                estabelecimento.getId(),
                cliente.getId(),
                servico.getId(),
                new Date(new Date().getTime() + 60_000));

        mockMvc.perform(
                post("/agenda")
                        .content(parseObjectToJson(request))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().is2xxSuccessful());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(request.data());
        calendar.add(Calendar.MINUTE, 15);

        AgendamentoCreate secondRequest = new AgendamentoCreate(
                estabelecimento.getId(),
                cliente.getId(),
                servico.getId(),
                calendar.getTime()
        );

        mockMvc.perform(
                        post("/agenda")
                                .content(parseObjectToJson(request))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().isConflict())
                .andExpect(jsonPath("$.msg").value("O horário solicitado não está disponível"));
    }

    private Estabelecimento createEstabelecimentoEntity() {
        Estabelecimento entity = Estabelecimento.builder()
                .nome("Fulano Teste")
                .cnpj("1092301293111")
                .email("fulano@Host.com")
                .senha("senha123")
                .build();
        return estabelecimentoRepository.saveAndFlush(entity);
    }

    private Servico createServicoEntity() {
        Servico entity = Servico.builder()
                .nome("Corte de cabelo")
                .estabelecimento(estabelecimento)
                .duracao(Time.valueOf(LocalTime.of(1, 30)))
                .build();
        return servicoRepository.saveAndFlush(entity);
    }

    private Cliente createClienteEntity() {
        Cliente entity = Cliente.builder()
                .id(UUID.randomUUID())
                .nome("Fulano Teste")
                .cpf("10923012931")
                .email("fulano@Host.com")
                .senha("senha123")
                .build();
        return clienteRepository.saveAndFlush(entity);
    }

    private String parseObjectToJson(Object request) throws JsonProcessingException {
        return new ObjectMapper()
                .writer()
                .withDefaultPrettyPrinter()
                .writeValueAsString(request);
    }

}
