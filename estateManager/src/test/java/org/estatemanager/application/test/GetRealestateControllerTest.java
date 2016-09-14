package org.estatemanager.application.test;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.estatemanager.application.controller.RealestateController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MockServletContext.class)
@WebAppConfiguration
public class GetRealestateControllerTest {

	private MockMvc mvc;

	@Before
	public void setUp() throws Exception {
		mvc = MockMvcBuilders.standaloneSetup(new RealestateController()).build();
	}

	@Test
	public void testGet() throws Exception {
		ResultActions perform = mvc.perform(MockMvcRequestBuilders.get("/api/1.0/realestate/65660641"));
		perform.andExpect(status().isOk());

		System.out.println("OUTPUT: " + perform.andReturn().getResponse().getContentAsString());

	}

	@Test
	public void testPut() throws Exception {

		ResultActions perform = mvc.perform(MockMvcRequestBuilders.get("/api/1.0/realestate/65660641"));

		String contentAsString = perform.andReturn().getResponse().getContentAsString();

		System.out.println("OUTPUT: " + contentAsString);

		MockHttpServletRequestBuilder put = MockMvcRequestBuilders.put("/api/1.0/realestate/65660641");
		put.contentType(TestUtil.APPLICATION_JSON_UTF8);
		put.content(contentAsString);

		perform = mvc.perform(put);
		perform.andExpect(status().isOk());
	}
}