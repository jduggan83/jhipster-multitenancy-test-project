package com.starbucks.inventory.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.starbucks.inventory.domain.Machine;
import com.starbucks.inventory.service.MachineService;
import com.starbucks.inventory.web.rest.errors.BadRequestAlertException;
import com.starbucks.inventory.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Machine.
 */
@RestController
@RequestMapping("/api")
public class MachineResource {

    private final Logger log = LoggerFactory.getLogger(MachineResource.class);

    private static final String ENTITY_NAME = "machine";

    private final MachineService machineService;

    public MachineResource(MachineService machineService) {
        this.machineService = machineService;
    }

    /**
     * POST  /machines : Create a new machine.
     *
     * @param machine the machine to create
     * @return the ResponseEntity with status 201 (Created) and with body the new machine, or with status 400 (Bad Request) if the machine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/machines")
    @Timed
    public ResponseEntity<Machine> createMachine(@Valid @RequestBody Machine machine) throws URISyntaxException {
        log.debug("REST request to save Machine : {}", machine);
        if (machine.getId() != null) {
            throw new BadRequestAlertException("A new machine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Machine result = machineService.save(machine);
        return ResponseEntity.created(new URI("/api/machines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /machines : Updates an existing machine.
     *
     * @param machine the machine to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated machine,
     * or with status 400 (Bad Request) if the machine is not valid,
     * or with status 500 (Internal Server Error) if the machine couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/machines")
    @Timed
    public ResponseEntity<Machine> updateMachine(@Valid @RequestBody Machine machine) throws URISyntaxException {
        log.debug("REST request to update Machine : {}", machine);
        if (machine.getId() == null) {
            return createMachine(machine);
        }
        Machine result = machineService.save(machine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, machine.getId().toString()))
            .body(result);
    }

    /**
     * GET  /machines : get all the machines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of machines in body
     */
    @GetMapping("/machines")
    @Timed
    public List<Machine> getAllMachines() {
        log.debug("REST request to get all Machines");
        return machineService.findAll();
        }

    /**
     * GET  /machines/:id : get the "id" machine.
     *
     * @param id the id of the machine to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the machine, or with status 404 (Not Found)
     */
    @GetMapping("/machines/{id}")
    @Timed
    public ResponseEntity<Machine> getMachine(@PathVariable Long id) {
        log.debug("REST request to get Machine : {}", id);
        Machine machine = machineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(machine));
    }

    /**
     * DELETE  /machines/:id : delete the "id" machine.
     *
     * @param id the id of the machine to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/machines/{id}")
    @Timed
    public ResponseEntity<Void> deleteMachine(@PathVariable Long id) {
        log.debug("REST request to delete Machine : {}", id);
        machineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
