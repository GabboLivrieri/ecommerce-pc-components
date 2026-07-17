package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.CarrelloProdotto;
import com.betacom.ecommerce.repository.CarrelloProdottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/carrello")
public class CarrelloController {

    @Autowired
    private CarrelloProdottoRepository carrelloProdottoRepository;


    @GetMapping("/utente/{idCarrello}")
    public List<CarrelloProdotto> getProdottiCarrello(@PathVariable Integer idCarrello) {

        return carrelloProdottoRepository.findAll()
                .stream()
                .filter(cp -> cp.getCarrello().getId().equals(idCarrello))
                .toList();

    }


    @PostMapping
    public CarrelloProdotto aggiungiAlCarrello(@RequestBody CarrelloProdotto cp) {


        Optional<CarrelloProdotto> esistente =
                carrelloProdottoRepository.findAll()
                .stream()
                .filter(prodotto ->
                        prodotto.getCarrello().getId()
                                .equals(cp.getCarrello().getId())
                        &&
                        prodotto.getProdotto().getId()
                                .equals(cp.getProdotto().getId())
                )
                .findFirst();



        if (esistente.isPresent()) {


            CarrelloProdotto presente = esistente.get();


            presente.setQuantita(
                    presente.getQuantita() + cp.getQuantita()
            );


            return carrelloProdottoRepository.save(presente);

        }



        return carrelloProdottoRepository.save(cp);

    }



    @PutMapping("/{id}")
    public CarrelloProdotto aggiornaQuantita(
            @PathVariable Integer id,
            @RequestBody CarrelloProdotto dto
    ) {


        CarrelloProdotto cp =
                carrelloProdottoRepository.findById(id)
                .orElse(null);


        if (cp == null) {
            return null;
        }


        cp.setQuantita(dto.getQuantita());


        return carrelloProdottoRepository.save(cp);

    }



    @DeleteMapping("/{id}")
    public void rimuoviDalCarrello(@PathVariable Integer id) {

        carrelloProdottoRepository.deleteById(id);

    }

}