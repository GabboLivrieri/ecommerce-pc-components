package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Ruolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RuoloRepository extends JpaRepository<Ruolo, Integer> {
}