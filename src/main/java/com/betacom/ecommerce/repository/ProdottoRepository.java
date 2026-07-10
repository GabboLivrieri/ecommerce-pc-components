package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Prodotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdottoRepository extends JpaRepository<Prodotto, Integer> {
}