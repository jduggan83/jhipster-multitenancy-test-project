package com.starbucks.inventory.service;

import com.starbucks.inventory.domain.Machine;
import java.util.List;

/**
 * Service Interface for managing Machine.
 */
public interface MachineService {

    /**
     * Save a machine.
     *
     * @param machine the entity to save
     * @return the persisted entity
     */
    Machine save(Machine machine);

    /**
     * Get all the machines.
     *
     * @return the list of entities
     */
    List<Machine> findAll();

    /**
     * Get the "id" machine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Machine findOne(Long id);

    /**
     * Delete the "id" machine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
