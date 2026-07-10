package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.ValutazioneProdotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValutazioneProdottoRepository extends JpaRepository<ValutazioneProdotto, Integer> {
}