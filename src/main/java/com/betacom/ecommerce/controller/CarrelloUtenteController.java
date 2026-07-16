package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Carrello;
import com.betacom.ecommerce.model.Utente;
import com.betacom.ecommerce.repository.CarrelloRepository;
import com.betacom.ecommerce.repository.UtenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrelli")
public class CarrelloUtenteController {

    @Autowired
    private CarrelloRepository carrelloRepository;

    @Autowired
    private UtenteRepository utenteRepository;


    @GetMapping("/utente/{idUtente}")
    public Carrello getCarrelloUtente(@PathVariable Integer idUtente) {

        return carrelloRepository.findAll()
                .stream()
                .filter(c -> c.getUtente().getId().equals(idUtente))
                .findFirst()
                .orElse(null);
    }


    @PostMapping("/utente/{idUtente}")
    public Carrello creaCarrello(@PathVariable Integer idUtente) {

        Utente utente = utenteRepository.findById(idUtente)
                .orElse(null);

        if (utente == null) {
            return null;
        }


        Carrello carrello = new Carrello();

        carrello.setUtente(utente);


        return carrelloRepository.save(carrello);
    }

}