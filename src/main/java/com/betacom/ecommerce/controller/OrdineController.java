package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.repository.OrdineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.betacom.ecommerce.model.*;
import com.betacom.ecommerce.repository.CarrelloRepository;
import com.betacom.ecommerce.repository.CarrelloProdottoRepository;
import com.betacom.ecommerce.repository.OrdineProdottoRepository;
import com.betacom.ecommerce.repository.UtenteRepository;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/ordini")
public class OrdineController {

    @Autowired
    private OrdineRepository ordineRepository;

    @Autowired
    private CarrelloRepository carrelloRepository;

    @Autowired
    private CarrelloProdottoRepository carrelloProdottoRepository;

    @Autowired
    private OrdineProdottoRepository ordineProdottoRepository;

    @Autowired
    private UtenteRepository utenteRepository;

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

    @PostMapping("/crea/{idUtente}")
public Ordine creaOrdineDaCarrello(@PathVariable Integer idUtente) {


    Utente utente = utenteRepository.findById(idUtente)
            .orElse(null);


    if (utente == null) {
        return null;
    }


    Carrello carrello = carrelloRepository.findAll()
            .stream()
            .filter(c -> c.getUtente().getId().equals(idUtente))
            .findFirst()
            .orElse(null);


    if (carrello == null) {
        return null;
    }


    List<CarrelloProdotto> prodotti = carrelloProdottoRepository.findAll()
            .stream()
            .filter(cp -> cp.getCarrello().getId().equals(carrello.getId()))
            .toList();


    if (prodotti.isEmpty()) {
        return null;
    }


    Ordine ordine = new Ordine();

    ordine.setUtente(utente);
    ordine.setDataOrdine(LocalDate.now());
    ordine.setTotale(BigDecimal.ZERO);


    ordine = ordineRepository.save(ordine);



    BigDecimal totale = BigDecimal.ZERO;


    for (CarrelloProdotto cp : prodotti) {


        OrdineProdotto op = new OrdineProdotto();

        op.setOrdine(ordine);
        op.setProdotto(cp.getProdotto());
        op.setQuantita(cp.getQuantita());
        op.setPrezzo(cp.getProdotto().getPrezzo());


        ordineProdottoRepository.save(op);


        totale = totale.add(
                cp.getProdotto()
                .getPrezzo()
                .multiply(
                    BigDecimal.valueOf(cp.getQuantita())
                )
        );

    }


    ordine.setTotale(totale);

    ordineRepository.save(ordine);


    carrelloProdottoRepository.deleteAll(prodotti);


    return ordine;
}
}