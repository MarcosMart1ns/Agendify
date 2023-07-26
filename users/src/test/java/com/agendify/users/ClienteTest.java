package com.agendify.users;

import com.agendify.users.config.TestsConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = TestsConfig.class)
@AutoConfigureMockMvc
class ClienteTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getClienteTest() throws Exception {
        mockMvc.perform(get("/123213123")).andExpect(status().is2xxSuccessful());
    }

}
