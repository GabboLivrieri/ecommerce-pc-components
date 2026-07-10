package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Utente;
import com.betacom.ecommerce.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/utenti")
public class UtenteController {

    @Autowired
    private UtenteRepository utenteRepository;

    @GetMapping
    public List<Utente> getAllUtenti() {
        return utenteRepository.findAll();
    }

    @PostMapping("/registrazione")
    public Utente registraUtente(@RequestBody Utente utente) {
        return utenteRepository.save(utente);
    }

    @PostMapping("/login")
    public Utente login(@RequestBody Utente credenziali) {
        Utente u = utenteRepository.findByEmail(credenziali.getEmail());
        if (u != null && u.getPassword().equals(credenziali.getPassword())) {
            return u; 
        }
        return null;
    }
}