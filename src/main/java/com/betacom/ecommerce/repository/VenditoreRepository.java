package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Venditore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VenditoreRepository extends JpaRepository<Venditore, Integer> {
}