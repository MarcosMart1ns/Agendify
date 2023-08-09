package com.agendify.users;

import com.agendify.domain.mappers.ClienteMapper;
import com.agendify.domain.records.Cliente;
import com.agendify.domain.repositories.ClienteRepository;
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
class ClienteTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    ClienteMapper clienteMapper;

    BCryptPasswordEncoder encode = new BCryptPasswordEncoder();

    @BeforeEach
    void beforeAllTests(){
        clienteRepository.deleteAll();
    }

    @Test
    void getClienteTest() throws Exception {
        Cliente cliente = createClienteData();
        mockMvc.perform(get("/cliente/" + cliente.id())).andExpect(status().is2xxSuccessful());
    }

    @Test
    void createClienteTest() throws Exception {
        Cliente cliente = clienteMapper.fromEntity(buildCompleteClienteEntity());

        mockMvc.perform(
                        post("/cliente")
                                .content(parseObjectToJson(cliente))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                ).andExpect(status().is2xxSuccessful())
                .andExpect(MockMvcResultMatchers.jsonPath("$.nome").value(cliente.nome()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value(cliente.email()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.cpf").value(cliente.cpf()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    void updateClienteTest() throws Exception {
        com.agendify.domain.entities.Cliente cliente = clienteRepository.saveAndFlush(buildCompleteClienteEntity());

        String updatedNome = "Maria Alzira";
        cliente.setNome(updatedNome);

        Cliente clienteRequest = clienteMapper.fromEntity(cliente);

        mockMvc.perform(patch("/cliente/" + clienteRequest.id())
                        .content(parseObjectToJson(clienteRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful())
                .andExpect(MockMvcResultMatchers.jsonPath("$.nome").value(updatedNome));
    }

    @Test
    void validatePassword() throws Exception {
        Cliente cliente = clienteMapper.fromEntity(buildCompleteClienteEntity());

        String response = mockMvc.perform(
                        post("/cliente")
                                .content(parseObjectToJson(cliente))
                                .contentType(MediaType.APPLICATION_JSON)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().is2xxSuccessful())
                .andReturn()
                .getResponse()
                .getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Cliente clienteResponse = mapper.readValue(response, Cliente.class);

        Assertions.assertTrue(encode.matches(cliente.senha(), clienteResponse.senha()));
    }

    private String parseObjectToJson(Cliente cliente) throws JsonProcessingException {
        return new ObjectMapper()
                .writer()
                .withDefaultPrettyPrinter()
                .writeValueAsString(cliente);
    }

    private Cliente createClienteData() {
        com.agendify.domain.entities.Cliente cliente = clienteRepository.saveAndFlush(buildCompleteClienteEntity());
        return clienteMapper.fromEntity(cliente);
    }

    private com.agendify.domain.entities.Cliente buildCompleteClienteEntity() {
        return com.agendify.domain.entities.Cliente.builder()
                .nome("Fulano Teste")
                .cpf("10923012931")
                .email("fulano@Host.com")
                .senha("senha123")
                .build();
    }

}
