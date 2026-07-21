package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Categoria;
import com.betacom.ecommerce.model.Prodotto;
import com.betacom.ecommerce.model.Ruolo;
import com.betacom.ecommerce.model.Utente;
import com.betacom.ecommerce.model.Venditore;
import com.betacom.ecommerce.repository.ProdottoRepository;
import com.betacom.ecommerce.repository.UtenteRepository;
import com.betacom.ecommerce.repository.VenditoreRepository;

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


    @Autowired
    private VenditoreRepository venditoreRepository;



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



    @GetMapping("/venditore/{idVenditore}")
    public List<Prodotto> getProdottiVenditore(
            @PathVariable Integer idVenditore
    ) {

        return prodottoRepository.findByVenditoreId(idVenditore);

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
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));



        if (utente.getRuolo() != Ruolo.VENDITORE) {

            throw new RuntimeException("Non autorizzato");

        }



        Venditore venditore = venditoreRepository.findByUtente(utente);



        if (venditore == null) {

            throw new RuntimeException("Venditore non trovato");

        }



        Prodotto prodotto = new Prodotto();


        prodotto.setNome(nome);

        prodotto.setDescrizione(descrizione);

        prodotto.setPrezzo(prezzo);

        prodotto.setQuantita(quantita);



        Categoria categoria = new Categoria();

        categoria.setId(idCategoria);

        prodotto.setCategoria(categoria);



        prodotto.setVenditore(venditore);



        prodotto.setImmagine(
                immagine.getBytes()
        );



        return prodottoRepository.save(prodotto);

    }




    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public Prodotto modificaProdotto(

            @PathVariable Integer id,

            @RequestParam Integer idUtente,

            @RequestParam String nome,

            @RequestParam String descrizione,

            @RequestParam BigDecimal prezzo,

            @RequestParam Integer quantita,

            @RequestParam Integer idCategoria,

            @RequestParam(required = false) MultipartFile immagine

    ) throws IOException {



        Prodotto prodotto = prodottoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prodotto non trovato"));



        Utente utente = utenteRepository.findById(idUtente)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));



        Venditore venditore = venditoreRepository.findByUtente(utente);



        if (venditore == null) {

            throw new RuntimeException("Venditore non trovato");

        }



        if (!prodotto.getVenditore().getId()
                .equals(venditore.getId())) {

            throw new RuntimeException("Non autorizzato");

        }



        prodotto.setNome(nome);

        prodotto.setDescrizione(descrizione);

        prodotto.setPrezzo(prezzo);

        prodotto.setQuantita(quantita);



        Categoria categoria = new Categoria();

        categoria.setId(idCategoria);

        prodotto.setCategoria(categoria);



        if (immagine != null && !immagine.isEmpty()) {

            prodotto.setImmagine(
                    immagine.getBytes()
            );

        }



        return prodottoRepository.save(prodotto);

    }




    @DeleteMapping("/{id}")
    public void deleteProdotto(

            @PathVariable Integer id,

            @RequestParam Integer idUtente

    ) {


        Prodotto prodotto = prodottoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prodotto non trovato"));



        Utente utente = utenteRepository.findById(idUtente)
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));



        Venditore venditore = venditoreRepository.findByUtente(utente);



        if (venditore == null) {

            throw new RuntimeException("Venditore non trovato");

        }



        if (!prodotto.getVenditore().getId()
                .equals(venditore.getId())) {

            throw new RuntimeException("Non autorizzato");

        }



        prodottoRepository.deleteById(id);

    }

}