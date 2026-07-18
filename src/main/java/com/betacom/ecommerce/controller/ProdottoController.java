package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Categoria;
import com.betacom.ecommerce.model.Prodotto;
import com.betacom.ecommerce.model.Ruolo;
import com.betacom.ecommerce.model.Utente;
import com.betacom.ecommerce.repository.ProdottoRepository;
import com.betacom.ecommerce.repository.UtenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/prodotti")
public class ProdottoController {


    @Autowired
    private ProdottoRepository prodottoRepository;


    @Autowired
    private UtenteRepository utenteRepository;



    @GetMapping
    public List<Prodotto> getAllProdotti() {

        return prodottoRepository.findAll();

    }



    @GetMapping("/{id}")
    public Prodotto getProdottoById(
            @PathVariable Integer id
    ) {

        return prodottoRepository.findById(id)
                .orElse(null);

    }



    @PostMapping(consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public Prodotto saveProdotto(

            @RequestParam Integer idUtente,

            @RequestParam String nome,

            @RequestParam String descrizione,

            @RequestParam BigDecimal prezzo,

            @RequestParam Integer quantita,

            @RequestParam Integer idCategoria,

            @RequestParam MultipartFile immagine

    ) throws IOException {



        Utente utente = utenteRepository.findById(idUtente)
                .orElse(null);



        if (utente == null) {

            throw new RuntimeException("Utente non trovato");

        }



        if (utente.getRuolo() != Ruolo.VENDITORE) {

            throw new RuntimeException("Non autorizzato");

        }



        Prodotto prodotto = new Prodotto();


        prodotto.setNome(nome);

        prodotto.setDescrizione(descrizione);

        prodotto.setPrezzo(prezzo);

        prodotto.setQuantita(quantita);



        Categoria categoria = new Categoria();

        categoria.setId(idCategoria);

        prodotto.setCategoria(categoria);



        prodotto.setImmagine(
                immagine.getBytes()
        );



        return prodottoRepository.save(prodotto);

    }



    @DeleteMapping("/{id}")
    public void deleteProdotto(
            @PathVariable Integer id
    ) {

        prodottoRepository.deleteById(id);

    }

}