package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Zoo;
import com.mycompany.myapp.repository.ZooRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Zoo.
 */
@Service
@Transactional
public class ZooService {

    private final Logger log = LoggerFactory.getLogger(ZooService.class);

    private final ZooRepository zooRepository;

    public ZooService(ZooRepository zooRepository) {
        this.zooRepository = zooRepository;
    }

    /**
     * Save a zoo.
     *
     * @param zoo the entity to save
     * @return the persisted entity
     */
    public Zoo save(Zoo zoo) {
        log.debug("Request to save Zoo : {}", zoo);
        return zooRepository.save(zoo);
    }

    /**
     *  Get all the zoos.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Zoo> findAll(Pageable pageable) {
        log.debug("Request to get all Zoos");
        return zooRepository.findAll(pageable);
    }

    /**
     *  Get one zoo by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Zoo findOne(Long id) {
        log.debug("Request to get Zoo : {}", id);
        return zooRepository.findOne(id);
    }

    /**
     *  Delete the  zoo by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Zoo : {}", id);
        zooRepository.delete(id);
    }
}
