package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.ValutazioneProdotto;
import com.betacom.ecommerce.model.ValutazioneVenditore;
import com.betacom.ecommerce.repository.ValutazioneProdottoRepository;
import com.betacom.ecommerce.repository.ValutazioneVenditoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/valutazioni")
public class ValutazioneController {

    @Autowired
    private ValutazioneProdottoRepository valutazioneProdottoRepository;

    @Autowired
    private ValutazioneVenditoreRepository valutazioneVenditoreRepository;

    @GetMapping("/prodotto/{idProdotto}")
    public List<ValutazioneProdotto> getValutazioniProdotto(@PathVariable Integer idProdotto) {
        return valutazioneProdottoRepository.findAll().stream()
                .filter(vp -> vp.getProdotto().getId().equals(idProdotto))
                .toList();
    }

    @PostMapping("/prodotto")
    public ValutazioneProdotto recensisciProdotto(@RequestBody ValutazioneProdotto vp) {
        return valutazioneProdottoRepository.save(vp);
    }

    @GetMapping("/venditore/{idVenditore}")
    public List<ValutazioneVenditore> getValutazioniVenditore(@PathVariable Integer idVenditore) {
        return valutazioneVenditoreRepository.findAll().stream()
                .filter(vv -> vv.getVenditore().getId().equals(idVenditore))
                .toList();
    }

    @PostMapping("/venditore")
    public ValutazioneVenditore recensisciVenditore(@RequestBody ValutazioneVenditore vv) {
        return valutazioneVenditoreRepository.save(vv);
    }
}