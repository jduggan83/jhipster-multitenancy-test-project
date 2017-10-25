package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Document;
import com.mycompany.myapp.repository.DocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Document.
 */
@Service
@Transactional
public class DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    /**
     * Save a document.
     *
     * @param document the entity to save
     * @return the persisted entity
     */
    public Document save(Document document) {
        log.debug("Request to save Document : {}", document);
        return documentRepository.save(document);
    }

    /**
     *  Get all the documents.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Document> findAll(Pageable pageable) {
        log.debug("Request to get all Documents");
        return documentRepository.findAll(pageable);
    }

    /**
     *  Get one document by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Document findOne(Long id) {
        log.debug("Request to get Document : {}", id);
        return documentRepository.findOne(id);
    }

    /**
     *  Delete the  document by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Document : {}", id);
        documentRepository.delete(id);
    }
}
