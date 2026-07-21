package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Ordine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdineRepository extends JpaRepository<Ordine, Integer> {

    List<Ordine> findByUtenteId(Integer idUtente);

}