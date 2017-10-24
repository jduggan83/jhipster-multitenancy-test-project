package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Tester;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tester entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TesterRepository extends JpaRepository<Tester, Long> {

}
