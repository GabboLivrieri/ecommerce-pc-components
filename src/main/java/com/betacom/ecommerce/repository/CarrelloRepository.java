package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Carrello;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarrelloRepository extends JpaRepository<Carrello, Integer> {
}