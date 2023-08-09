package com.agendify.users;

import com.agendify.domain.mappers.EstabelecimentoMapper;
import com.agendify.domain.records.Estabelecimento;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.users.config.TestsConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = TestsConfig.class)
@AutoConfigureMockMvc
class EstabelecimentoTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    EstabelecimentoMapper estabelecimentoMapper;

    BCryptPasswordEncoder encode = new BCryptPasswordEncoder();

    @BeforeEach
    void beforeAllTests(){
        estabelecimentoRepository.deleteAll();
    }

    @Test
    void getEstabelecimentoTest() throws Exception {
        Estabelecimento estabelecimento = createEstabelecimentoData();
        mockMvc.perform(get("/estabelecimento/" + estabelecimento.id())).andExpect(status().is2xxSuccessful());
    }

    @Test
    void createEstabelecimentoTest() throws Exception {
        Estabelecimento estabelecimento = estabelecimentoMapper.fromEntity(buildEstabelecimentoEntity());

        mockMvc.perform(
                        post("/estabelecimento")
                                .content(parseObjectToJson(estabelecimento))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().is2xxSuccessful())
                .andExpect(MockMvcResultMatchers.jsonPath("$.nome").value(estabelecimento.nome()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(estabelecimento.email()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.cnpj").value(estabelecimento.cnpj()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    void updateEstabelecimentoTest() throws Exception {
        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.saveAndFlush(buildEstabelecimentoEntity());

        String updatedNome = "Maria Alzira";
        estabelecimento.setNome(updatedNome);

        Estabelecimento estabelecimentoRequest = estabelecimentoMapper.fromEntity(estabelecimento);

        mockMvc.perform(patch("/estabelecimento/" + estabelecimentoRequest.id())
                        .content(parseObjectToJson(estabelecimentoRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful())
                .andExpect(MockMvcResultMatchers.jsonPath("$.nome").value(updatedNome));
    }

    @Test
    void validatePassword() throws Exception {
        Estabelecimento estabelecimento = estabelecimentoMapper.fromEntity(buildEstabelecimentoEntity());

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

        Assertions.assertTrue(encode.matches(estabelecimento.senha(), estabelecimentoResponse.senha()));
    }

    private String parseObjectToJson(Estabelecimento estabelecimento) throws JsonProcessingException {
        return new ObjectMapper()
                .writer()
                .withDefaultPrettyPrinter()
                .writeValueAsString(estabelecimento);
    }

    private Estabelecimento createEstabelecimentoData() {
        com.agendify.domain.entities.Estabelecimento estabelecimento = estabelecimentoRepository.saveAndFlush(buildEstabelecimentoEntity());
        return estabelecimentoMapper.fromEntity(estabelecimento);
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
