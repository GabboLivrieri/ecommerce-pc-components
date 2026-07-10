package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Prodotto;
import com.betacom.ecommerce.repository.ProdottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/prodotti")
public class ProdottoController {

    @Autowired
    private ProdottoRepository prodottoRepository;

    @GetMapping
    public List<Prodotto> getAllProdotti() {
        return prodottoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Prodotto getProdottoById(@PathVariable Integer id) {
        return prodottoRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Prodotto saveProdotto(@RequestBody Prodotto prodotto) {
        return prodottoRepository.save(prodotto);
    }

    @DeleteMapping("/{id}")
    public void deleteProdotto(@PathVariable Integer id) {
        prodottoRepository.deleteById(id);
    }
}