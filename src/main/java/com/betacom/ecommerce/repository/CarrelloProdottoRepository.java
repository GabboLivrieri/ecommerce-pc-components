package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.CarrelloProdotto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarrelloProdottoRepository extends JpaRepository<CarrelloProdotto, Integer> {


    List<CarrelloProdotto> findByCarrelloId(Integer idCarrello);


}