package com.agendify.users;


import com.agendify.domain.entities.Estabelecimento;
import com.agendify.domain.repositories.EstabelecimentoRepository;
import com.agendify.users.config.TestsConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = TestsConfig.class)
@AutoConfigureMockMvc
public class SearchEstabelecimentosTest {

    @Autowired
    private EstabelecimentoRepository estabelecimentoRepository;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void searhEstabelecimentosTest() throws Exception {
        Estabelecimento estabelecimentoEntity = Estabelecimento.builder()
                .nome("Fulano Teste")
                .cnpj("1092301293111")
                .email("fulano@Host.com")
                .senha("senha123")
                .build();

        estabelecimentoRepository.saveAndFlush(estabelecimentoEntity);

        mockMvc.perform(
                get("/estabelecimento?searchText=fulano")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());
    }
}
