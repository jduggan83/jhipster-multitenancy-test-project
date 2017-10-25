package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Zoo;
import com.mycompany.myapp.service.ZooService;
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
 * REST controller for managing Zoo.
 */
@RestController
@RequestMapping("/api")
public class ZooResource {

    private final Logger log = LoggerFactory.getLogger(ZooResource.class);

    private static final String ENTITY_NAME = "zoo";

    private final ZooService zooService;

    public ZooResource(ZooService zooService) {
        this.zooService = zooService;
    }

    /**
     * POST  /zoos : Create a new zoo.
     *
     * @param zoo the zoo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zoo, or with status 400 (Bad Request) if the zoo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/zoos")
    @Timed
    public ResponseEntity<Zoo> createZoo(@Valid @RequestBody Zoo zoo) throws URISyntaxException {
        log.debug("REST request to save Zoo : {}", zoo);
        if (zoo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new zoo cannot already have an ID")).body(null);
        }
        Zoo result = zooService.save(zoo);
        return ResponseEntity.created(new URI("/api/zoos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /zoos : Updates an existing zoo.
     *
     * @param zoo the zoo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zoo,
     * or with status 400 (Bad Request) if the zoo is not valid,
     * or with status 500 (Internal Server Error) if the zoo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/zoos")
    @Timed
    public ResponseEntity<Zoo> updateZoo(@Valid @RequestBody Zoo zoo) throws URISyntaxException {
        log.debug("REST request to update Zoo : {}", zoo);
        if (zoo.getId() == null) {
            return createZoo(zoo);
        }
        Zoo result = zooService.save(zoo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zoo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /zoos : get all the zoos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of zoos in body
     */
    @GetMapping("/zoos")
    @Timed
    public ResponseEntity<List<Zoo>> getAllZoos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Zoos");
        Page<Zoo> page = zooService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/zoos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /zoos/:id : get the "id" zoo.
     *
     * @param id the id of the zoo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zoo, or with status 404 (Not Found)
     */
    @GetMapping("/zoos/{id}")
    @Timed
    public ResponseEntity<Zoo> getZoo(@PathVariable Long id) {
        log.debug("REST request to get Zoo : {}", id);
        Zoo zoo = zooService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(zoo));
    }

    /**
     * DELETE  /zoos/:id : delete the "id" zoo.
     *
     * @param id the id of the zoo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/zoos/{id}")
    @Timed
    public ResponseEntity<Void> deleteZoo(@PathVariable Long id) {
        log.debug("REST request to delete Zoo : {}", id);
        Zoo zoo = zooService.findOne(id);
        if(zoo == null || !zoo.getUsers().isEmpty()){
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "deletefail", "Delete Failed. Please remove users first")).body(null);
        }
        zooService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
