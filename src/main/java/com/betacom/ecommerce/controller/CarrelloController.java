package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.CarrelloProdotto;
import com.betacom.ecommerce.repository.CarrelloProdottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/carrello")
public class CarrelloController {

    @Autowired
    private CarrelloProdottoRepository carrelloProdottoRepository;

    @GetMapping("/utente/{idCarrello}")
    public List<CarrelloProdotto> getProdottiCarrello(@PathVariable Integer idCarrello) {
        return carrelloProdottoRepository.findAll().stream()
                .filter(cp -> cp.getCarrello().getId().equals(idCarrello))
                .toList();
    }

    @PostMapping
    public CarrelloProdotto aggiungiAlCarrello(@RequestBody CarrelloProdotto cp) {
        return carrelloProdottoRepository.save(cp);
    }

    @DeleteMapping("/{id}")
    public void rimuoviDalCarrello(@PathVariable Integer id) {
        carrelloProdottoRepository.deleteById(id);
    }
}