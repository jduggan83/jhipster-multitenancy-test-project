package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Animal;
import com.mycompany.myapp.repository.AnimalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Animal.
 */
@Service
@Transactional
public class AnimalService {

    private final Logger log = LoggerFactory.getLogger(AnimalService.class);

    private final AnimalRepository animalRepository;

    public AnimalService(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    /**
     * Save a animal.
     *
     * @param animal the entity to save
     * @return the persisted entity
     */
    public Animal save(Animal animal) {
        log.debug("Request to save Animal : {}", animal);
        return animalRepository.save(animal);
    }

    /**
     *  Get all the animals.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Animal> findAll(Pageable pageable) {
        log.debug("Request to get all Animals");
        return animalRepository.findAll(pageable);
    }

    /**
     *  Get one animal by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Animal findOne(Long id) {
        log.debug("Request to get Animal : {}", id);
        return animalRepository.findOne(id);
    }

    /**
     *  Delete the  animal by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Animal : {}", id);
        animalRepository.delete(id);
    }
}
