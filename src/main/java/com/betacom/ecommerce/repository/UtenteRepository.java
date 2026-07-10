package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Integer> {
    
    Utente findByEmail(String email);
}