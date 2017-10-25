package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Zoo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Zoo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZooRepository extends JpaRepository<Zoo, Long> {

}
