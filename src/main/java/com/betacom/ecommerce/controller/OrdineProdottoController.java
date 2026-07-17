package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.OrdineProdotto;
import com.betacom.ecommerce.repository.OrdineProdottoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/ordine-prodotti")
public class OrdineProdottoController {


    @Autowired
    private OrdineProdottoRepository ordineProdottoRepository;


    @GetMapping("/{idOrdine}")
    public List<OrdineProdotto> getProdottiOrdine(
            @PathVariable Integer idOrdine
    ) {

        return ordineProdottoRepository.findByOrdineId(idOrdine);

    }

}