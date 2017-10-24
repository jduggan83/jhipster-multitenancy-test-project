package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.Tester;
import com.mycompany.myapp.repository.TesterRepository;
import com.mycompany.myapp.service.TesterService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TesterResource REST controller.
 *
 * @see TesterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TesterResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TesterRepository testerRepository;

    @Autowired
    private TesterService testerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTesterMockMvc;

    private Tester tester;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TesterResource testerResource = new TesterResource(testerService);
        this.restTesterMockMvc = MockMvcBuilders.standaloneSetup(testerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tester createEntity(EntityManager em) {
        Tester tester = new Tester()
            .name(DEFAULT_NAME);
        return tester;
    }

    @Before
    public void initTest() {
        tester = createEntity(em);
    }

    @Test
    @Transactional
    public void createTester() throws Exception {
        int databaseSizeBeforeCreate = testerRepository.findAll().size();

        // Create the Tester
        restTesterMockMvc.perform(post("/api/testers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tester)))
            .andExpect(status().isCreated());

        // Validate the Tester in the database
        List<Tester> testerList = testerRepository.findAll();
        assertThat(testerList).hasSize(databaseSizeBeforeCreate + 1);
        Tester testTester = testerList.get(testerList.size() - 1);
        assertThat(testTester.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTesterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testerRepository.findAll().size();

        // Create the Tester with an existing ID
        tester.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTesterMockMvc.perform(post("/api/testers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tester)))
            .andExpect(status().isBadRequest());

        // Validate the Tester in the database
        List<Tester> testerList = testerRepository.findAll();
        assertThat(testerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = testerRepository.findAll().size();
        // set the field null
        tester.setName(null);

        // Create the Tester, which fails.

        restTesterMockMvc.perform(post("/api/testers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tester)))
            .andExpect(status().isBadRequest());

        List<Tester> testerList = testerRepository.findAll();
        assertThat(testerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTesters() throws Exception {
        // Initialize the database
        testerRepository.saveAndFlush(tester);

        // Get all the testerList
        restTesterMockMvc.perform(get("/api/testers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tester.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getTester() throws Exception {
        // Initialize the database
        testerRepository.saveAndFlush(tester);

        // Get the tester
        restTesterMockMvc.perform(get("/api/testers/{id}", tester.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tester.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTester() throws Exception {
        // Get the tester
        restTesterMockMvc.perform(get("/api/testers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTester() throws Exception {
        // Initialize the database
        testerService.save(tester);

        int databaseSizeBeforeUpdate = testerRepository.findAll().size();

        // Update the tester
        Tester updatedTester = testerRepository.findOne(tester.getId());
        updatedTester
            .name(UPDATED_NAME);

        restTesterMockMvc.perform(put("/api/testers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTester)))
            .andExpect(status().isOk());

        // Validate the Tester in the database
        List<Tester> testerList = testerRepository.findAll();
        assertThat(testerList).hasSize(databaseSizeBeforeUpdate);
        Tester testTester = testerList.get(testerList.size() - 1);
        assertThat(testTester.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTester() throws Exception {
        int databaseSizeBeforeUpdate = testerRepository.findAll().size();

        // Create the Tester

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTesterMockMvc.perform(put("/api/testers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tester)))
            .andExpect(status().isCreated());

        // Validate the Tester in the database
        List<Tester> testerList = testerRepository.findAll();
        assertThat(testerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTester() throws Exception {
        // Initialize the database
        testerService.save(tester);

        int databaseSizeBeforeDelete = testerRepository.findAll().size();

        // Get the tester
        restTesterMockMvc.perform(delete("/api/testers/{id}", tester.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tester> testerList = testerRepository.findAll();
        assertThat(testerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tester.class);
        Tester tester1 = new Tester();
        tester1.setId(1L);
        Tester tester2 = new Tester();
        tester2.setId(tester1.getId());
        assertThat(tester1).isEqualTo(tester2);
        tester2.setId(2L);
        assertThat(tester1).isNotEqualTo(tester2);
        tester1.setId(null);
        assertThat(tester1).isNotEqualTo(tester2);
    }
}
