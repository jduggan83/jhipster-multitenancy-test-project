package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Tester;
import com.mycompany.myapp.repository.TesterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Tester.
 */
@Service
@Transactional
public class TesterService {

    private final Logger log = LoggerFactory.getLogger(TesterService.class);

    private final TesterRepository testerRepository;

    public TesterService(TesterRepository testerRepository) {
        this.testerRepository = testerRepository;
    }

    /**
     * Save a tester.
     *
     * @param tester the entity to save
     * @return the persisted entity
     */
    public Tester save(Tester tester) {
        log.debug("Request to save Tester : {}", tester);
        return testerRepository.save(tester);
    }

    /**
     *  Get all the testers.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Tester> findAll(Pageable pageable) {
        log.debug("Request to get all Testers");
        return testerRepository.findAll(pageable);
    }

    /**
     *  Get one tester by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Tester findOne(Long id) {
        log.debug("Request to get Tester : {}", id);
        return testerRepository.findOne(id);
    }

    /**
     *  Delete the  tester by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Tester : {}", id);
        testerRepository.delete(id);
    }
}
