package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.Zoo;
import com.mycompany.myapp.repository.ZooRepository;
import com.mycompany.myapp.service.ZooService;
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
 * Test class for the ZooResource REST controller.
 *
 * @see ZooResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ZooResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ZooRepository zooRepository;

    @Autowired
    private ZooService zooService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZooMockMvc;

    private Zoo zoo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZooResource zooResource = new ZooResource(zooService);
        this.restZooMockMvc = MockMvcBuilders.standaloneSetup(zooResource)
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
    public static Zoo createEntity(EntityManager em) {
        Zoo zoo = new Zoo()
            .name(DEFAULT_NAME);
        return zoo;
    }

    @Before
    public void initTest() {
        zoo = createEntity(em);
    }

    @Test
    @Transactional
    public void createZoo() throws Exception {
        int databaseSizeBeforeCreate = zooRepository.findAll().size();

        // Create the Zoo
        restZooMockMvc.perform(post("/api/zoos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zoo)))
            .andExpect(status().isCreated());

        // Validate the Zoo in the database
        List<Zoo> zooList = zooRepository.findAll();
        assertThat(zooList).hasSize(databaseSizeBeforeCreate + 1);
        Zoo testZoo = zooList.get(zooList.size() - 1);
        assertThat(testZoo.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createZooWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zooRepository.findAll().size();

        // Create the Zoo with an existing ID
        zoo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZooMockMvc.perform(post("/api/zoos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zoo)))
            .andExpect(status().isBadRequest());

        // Validate the Zoo in the database
        List<Zoo> zooList = zooRepository.findAll();
        assertThat(zooList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = zooRepository.findAll().size();
        // set the field null
        zoo.setName(null);

        // Create the Zoo, which fails.

        restZooMockMvc.perform(post("/api/zoos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zoo)))
            .andExpect(status().isBadRequest());

        List<Zoo> zooList = zooRepository.findAll();
        assertThat(zooList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllZoos() throws Exception {
        // Initialize the database
        zooRepository.saveAndFlush(zoo);

        // Get all the zooList
        restZooMockMvc.perform(get("/api/zoos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zoo.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getZoo() throws Exception {
        // Initialize the database
        zooRepository.saveAndFlush(zoo);

        // Get the zoo
        restZooMockMvc.perform(get("/api/zoos/{id}", zoo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zoo.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingZoo() throws Exception {
        // Get the zoo
        restZooMockMvc.perform(get("/api/zoos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZoo() throws Exception {
        // Initialize the database
        zooService.save(zoo);

        int databaseSizeBeforeUpdate = zooRepository.findAll().size();

        // Update the zoo
        Zoo updatedZoo = zooRepository.findOne(zoo.getId());
        updatedZoo
            .name(UPDATED_NAME);

        restZooMockMvc.perform(put("/api/zoos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedZoo)))
            .andExpect(status().isOk());

        // Validate the Zoo in the database
        List<Zoo> zooList = zooRepository.findAll();
        assertThat(zooList).hasSize(databaseSizeBeforeUpdate);
        Zoo testZoo = zooList.get(zooList.size() - 1);
        assertThat(testZoo.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingZoo() throws Exception {
        int databaseSizeBeforeUpdate = zooRepository.findAll().size();

        // Create the Zoo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restZooMockMvc.perform(put("/api/zoos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zoo)))
            .andExpect(status().isCreated());

        // Validate the Zoo in the database
        List<Zoo> zooList = zooRepository.findAll();
        assertThat(zooList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteZoo() throws Exception {
        // Initialize the database
        zooService.save(zoo);

        int databaseSizeBeforeDelete = zooRepository.findAll().size();

        // Get the zoo
        restZooMockMvc.perform(delete("/api/zoos/{id}", zoo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Zoo> zooList = zooRepository.findAll();
        assertThat(zooList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Zoo.class);
        Zoo zoo1 = new Zoo();
        zoo1.setId(1L);
        Zoo zoo2 = new Zoo();
        zoo2.setId(zoo1.getId());
        assertThat(zoo1).isEqualTo(zoo2);
        zoo2.setId(2L);
        assertThat(zoo1).isNotEqualTo(zoo2);
        zoo1.setId(null);
        assertThat(zoo1).isNotEqualTo(zoo2);
    }
}
