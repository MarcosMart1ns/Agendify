package com.agendify.users;

import com.agendify.domain.mappers.EstabelecimentoMapper;
import com.agendify.domain.records.Cliente;
import com.agendify.domain.records.Estabelecimento;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.users.config.TestsConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = TestsConfig.class)
@AutoConfigureMockMvc
class EstabelecimentoTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EstabelecimentoRepository clienteRepository;

    @Autowired
    EstabelecimentoMapper clienteMapper;

    @Test
    void getEstabelecimentoTest() throws Exception {
        Estabelecimento cliente = createEstabelecimentoData();
        mockMvc.perform(get("/estabelecimento/" + cliente.id())).andExpect(status().is2xxSuccessful());
    }

    @Test
    void createEstabelecimentoTest() throws Exception {
        Estabelecimento cliente = clienteMapper.fromEntity(buildEstabelecimentoEntity());

        mockMvc.perform(
                        post("/estabelecimento")
                                .content(parseObjectToJson(cliente))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().is2xxSuccessful())
                .andExpect(MockMvcResultMatchers.jsonPath("$.nome").value(cliente.nome()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(cliente.email()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.cnpj").value(cliente.cnpj()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    public void validatePassword() throws Exception {
        Estabelecimento estabelecimento = clienteMapper.fromEntity(buildEstabelecimentoEntity());

        String response = mockMvc.perform(
                        post("/estabelecimento")
                                .content(parseObjectToJson(estabelecimento))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().is2xxSuccessful())
                .andReturn()
                .getResponse()
                .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Estabelecimento estabelecimentoResponse = mapper.readValue(response, Estabelecimento.class);

        Assertions.assertTrue(BCrypt.checkpw(estabelecimento.senha(), estabelecimentoResponse.senha()));
    }

    private String parseObjectToJson(Estabelecimento cliente) throws JsonProcessingException {
        return new ObjectMapper()
                .writer()
                .withDefaultPrettyPrinter()
                .writeValueAsString(cliente);
    }

    private Estabelecimento createEstabelecimentoData() {
        com.agendify.domain.entities.Estabelecimento cliente = clienteRepository.saveAndFlush(buildEstabelecimentoEntity());
        return clienteMapper.fromEntity(cliente);
    }

    private com.agendify.domain.entities.Estabelecimento buildEstabelecimentoEntity() {
        return com.agendify.domain.entities.Estabelecimento.builder()
                .nome("Fulano Teste")
                .cnpj("1092301293111")
                .email("fulano@Host.com")
                .senha("senha123")
                .build();
    }

}
