package com.starbucks.inventory.service.impl;

import com.starbucks.inventory.service.MachineService;
import com.starbucks.inventory.domain.Machine;
import com.starbucks.inventory.repository.MachineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Machine.
 */
@Service
@Transactional
public class MachineServiceImpl implements MachineService{

    private final Logger log = LoggerFactory.getLogger(MachineServiceImpl.class);

    private final MachineRepository machineRepository;

    public MachineServiceImpl(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    /**
     * Save a machine.
     *
     * @param machine the entity to save
     * @return the persisted entity
     */
    @Override
    public Machine save(Machine machine) {
        log.debug("Request to save Machine : {}", machine);
        return machineRepository.save(machine);
    }

    /**
     * Get all the machines.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Machine> findAll() {
        log.debug("Request to get all Machines");
        return machineRepository.findAll();
    }

    /**
     * Get one machine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Machine findOne(Long id) {
        log.debug("Request to get Machine : {}", id);
        return machineRepository.findOne(id);
    }

    /**
     * Delete the machine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Machine : {}", id);
        machineRepository.delete(id);
    }
}
