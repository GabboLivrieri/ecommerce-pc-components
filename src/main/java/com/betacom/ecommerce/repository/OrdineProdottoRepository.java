package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.OrdineProdotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdineProdottoRepository extends JpaRepository<OrdineProdotto, Integer> {
}