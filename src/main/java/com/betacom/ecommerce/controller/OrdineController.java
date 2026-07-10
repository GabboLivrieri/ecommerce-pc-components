package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Ordine;
import com.betacom.ecommerce.repository.OrdineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ordini")
public class OrdineController {

    @Autowired
    private OrdineRepository ordineRepository;

    @PostMapping
    public Ordine creaOrdine(@RequestBody Ordine ordine) {
        return ordineRepository.save(ordine);
    }

    @GetMapping("/utente/{idUtente}")
    public List<Ordine> getOrdiniUtente(@PathVariable Integer idUtente) {
        return ordineRepository.findAll().stream()
                .filter(o -> o.getUtente().getId().equals(idUtente))
                .toList();
    }
}