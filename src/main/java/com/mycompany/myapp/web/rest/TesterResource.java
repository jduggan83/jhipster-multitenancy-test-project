package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Tester;
import com.mycompany.myapp.service.TesterService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tester.
 */
@RestController
@RequestMapping("/api")
public class TesterResource {

    private final Logger log = LoggerFactory.getLogger(TesterResource.class);

    private static final String ENTITY_NAME = "tester";

    private final TesterService testerService;

    public TesterResource(TesterService testerService) {
        this.testerService = testerService;
    }

    /**
     * POST  /testers : Create a new tester.
     *
     * @param tester the tester to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tester, or with status 400 (Bad Request) if the tester has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/testers")
    @Timed
    public ResponseEntity<Tester> createTester(@Valid @RequestBody Tester tester) throws URISyntaxException {
        log.debug("REST request to save Tester : {}", tester);
        if (tester.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tester cannot already have an ID")).body(null);
        }
        Tester result = testerService.save(tester);
        return ResponseEntity.created(new URI("/api/testers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /testers : Updates an existing tester.
     *
     * @param tester the tester to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tester,
     * or with status 400 (Bad Request) if the tester is not valid,
     * or with status 500 (Internal Server Error) if the tester couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/testers")
    @Timed
    public ResponseEntity<Tester> updateTester(@Valid @RequestBody Tester tester) throws URISyntaxException {
        log.debug("REST request to update Tester : {}", tester);
        if (tester.getId() == null) {
            return createTester(tester);
        }
        Tester result = testerService.save(tester);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tester.getId().toString()))
            .body(result);
    }

    /**
     * GET  /testers : get all the testers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of testers in body
     */
    @GetMapping("/testers")
    @Timed
    public ResponseEntity<List<Tester>> getAllTesters(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Testers");
        Page<Tester> page = testerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/testers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /testers/:id : get the "id" tester.
     *
     * @param id the id of the tester to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tester, or with status 404 (Not Found)
     */
    @GetMapping("/testers/{id}")
    @Timed
    public ResponseEntity<Tester> getTester(@PathVariable Long id) {
        log.debug("REST request to get Tester : {}", id);
        Tester tester = testerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tester));
    }

    /**
     * DELETE  /testers/:id : delete the "id" tester.
     *
     * @param id the id of the tester to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/testers/{id}")
    @Timed
    public ResponseEntity<Void> deleteTester(@PathVariable Long id) {
        log.debug("REST request to delete Tester : {}", id);
        Tester tester = testerService.findOne(id);
        if(tester == null || !tester.getUsers().isEmpty()){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "deletefail", "Delete Failed. Please remove users first")).body(null);
        }
        testerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
