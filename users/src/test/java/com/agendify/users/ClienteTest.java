package com.agendify.users;

import com.agendify.domain.mappers.ClienteMapper;
import com.agendify.domain.records.Cliente;
import com.agendify.domain.repositories.ClienteRepository;
import com.agendify.users.config.TestsConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = TestsConfig.class)
@AutoConfigureMockMvc
class ClienteTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    ClienteMapper clienteMapper;

    @Test
    void getClienteTest() throws Exception {
        Cliente cliente = createClienteData();
        mockMvc.perform(get("/cliente/" + cliente.id())).andExpect(status().is2xxSuccessful());
    }

    @Test
    void createClienteTest() throws Exception {
        Cliente cliente = clienteMapper.fromEntity(buildClienteEntity());

        mockMvc.perform(
                        post("/cliente")
                                .content(parseObjectToJson(cliente))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().is2xxSuccessful())
                .andExpect(MockMvcResultMatchers.jsonPath("$.nome").value(cliente.nome()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(cliente.email()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.cpf").value(cliente.cpf()));
    }

    private String parseObjectToJson(Cliente cliente) throws JsonProcessingException {
        return new ObjectMapper()
                .writer()
                .withDefaultPrettyPrinter()
                .writeValueAsString(cliente);
    }

    private Cliente createClienteData() {
        com.agendify.domain.entities.Cliente cliente = clienteRepository.saveAndFlush(buildClienteEntity());
        return clienteMapper.fromEntity(cliente);
    }

    private com.agendify.domain.entities.Cliente buildClienteEntity() {
        return com.agendify.domain.entities.Cliente.builder()
                .nome("Fulano Teste")
                .cpf("1092301293")
                .email("fulanoHost")
                .build();
    }

}
