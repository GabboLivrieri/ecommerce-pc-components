package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.ValutazioneVenditore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValutazioneVenditoreRepository extends JpaRepository<ValutazioneVenditore, Integer> {
}