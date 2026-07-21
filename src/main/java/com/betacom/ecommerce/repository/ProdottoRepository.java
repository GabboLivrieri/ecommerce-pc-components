package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Prodotto;
import com.betacom.ecommerce.model.Venditore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdottoRepository extends JpaRepository<Prodotto, Integer> {

    List<Prodotto> findByVenditoreId(Integer idVenditore);

    List<Prodotto> findByVenditore(Venditore venditore);

}