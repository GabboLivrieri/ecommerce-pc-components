package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.dto.LoginDTO;
import com.betacom.ecommerce.dto.UtenteRegistrazioneDTO;
import com.betacom.ecommerce.dto.UtenteRispostaDTO;
import com.betacom.ecommerce.exception.BadRequestException;
import com.betacom.ecommerce.model.Utente;
import com.betacom.ecommerce.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/utenti")
public class UtenteController {

    @Autowired
    private UtenteRepository utenteRepository;

    @PostMapping("/registrazione")
    public UtenteRispostaDTO registraUtente(@RequestBody UtenteRegistrazioneDTO dto) {
        
        if (utenteRepository.findByEmail(dto.getEmail()) != null) {
            throw new BadRequestException("Email già registrata nel sistema.");
        }

        Utente utente = new Utente();
        utente.setNome(dto.getNome());
        utente.setCognome(dto.getCognome());
        utente.setEmail(dto.getEmail());
        utente.setPassword(dto.getPassword());
        utente.setRuolo(dto.getRuolo());

        Utente salvato = utenteRepository.save(utente);

        
        UtenteRispostaDTO risposta = new UtenteRispostaDTO();
        risposta.setId(salvato.getId());
        risposta.setNome(salvato.getNome());
        risposta.setCognome(salvato.getCognome());
        risposta.setEmail(salvato.getEmail());
        risposta.setRuolo(salvato.getRuolo());

        return risposta;
    }

    @PostMapping("/login")
    public UtenteRispostaDTO login(@RequestBody LoginDTO dto) {
        Utente u = utenteRepository.findByEmail(dto.getEmail());
        
        
        if (u == null || !u.getPassword().equals(dto.getPassword())) {
            throw new BadRequestException("Email o password non valide.");
        }

        UtenteRispostaDTO risposta = new UtenteRispostaDTO();
        risposta.setId(u.getId());
        risposta.setNome(u.getNome());
        risposta.setCognome(u.getCognome());
        risposta.setEmail(u.getEmail());
        risposta.setRuolo(u.getRuolo());

        return risposta;
    }
}