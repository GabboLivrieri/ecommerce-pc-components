package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.*;
import com.betacom.ecommerce.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ordini")
public class OrdineController {


    @Autowired
    private OrdineRepository ordineRepository;


    @Autowired
    private OrdineProdottoRepository ordineProdottoRepository;


    @Autowired
    private CarrelloRepository carrelloRepository;


    @Autowired
    private CarrelloProdottoRepository carrelloProdottoRepository;


    @Autowired
    private ProdottoRepository prodottoRepository;


    @Autowired
    private PagamentoRepository pagamentoRepository;


    


    @Transactional
    @PostMapping("/checkout/{idUtente}")
    public Ordine checkout(
            @PathVariable Integer idUtente
    ) {


        Carrello carrello =
                carrelloRepository.findByUtenteId(idUtente);



        if (carrello == null) {

            throw new RuntimeException("Carrello non trovato");

        }



        List<CarrelloProdotto> prodotti =
                carrelloProdottoRepository.findByCarrelloId(carrello.getId());



        if (prodotti.isEmpty()) {

            throw new RuntimeException("Carrello vuoto");

        }



        BigDecimal totale = BigDecimal.ZERO;



        for (CarrelloProdotto cp : prodotti) {


            BigDecimal prezzo =
                    cp.getProdotto().getPrezzo()
                    .multiply(
                            BigDecimal.valueOf(cp.getQuantita())
                    );


            totale = totale.add(prezzo);


            Prodotto prodotto = cp.getProdotto();


            if (prodotto.getQuantita() < cp.getQuantita()) {

                throw new RuntimeException(
                        "Quantità non disponibile per "
                        + prodotto.getNome()
                );

            }


            prodotto.setQuantita(
                    prodotto.getQuantita()
                    - cp.getQuantita()
            );


            prodottoRepository.save(prodotto);

        }




        Ordine ordine = new Ordine();


        ordine.setUtente(carrello.getUtente());

        ordine.setDataOrdine(
                LocalDate.now()
        );

        ordine.setTotale(totale);

        ordine.setStato("IN_ATTESA");



        ordine = ordineRepository.save(ordine);




        for (CarrelloProdotto cp : prodotti) {


            OrdineProdotto op = new OrdineProdotto();


            op.setOrdine(ordine);

            op.setProdotto(cp.getProdotto());

            op.setQuantita(cp.getQuantita());

            op.setPrezzo(
                    cp.getProdotto().getPrezzo()
            );


            ordineProdottoRepository.save(op);

        }




        Pagamento pagamento = new Pagamento();


        pagamento.setOrdine(ordine);

        pagamento.setMetodo("NON DEFINITO");

        pagamento.setStato("IN_ATTESA");



        pagamentoRepository.save(pagamento);




        carrelloProdottoRepository.deleteAll(prodotti);



        return ordine;

    }




    @GetMapping("/utente/{idUtente}")
    public List<Ordine> getOrdiniUtente(
            @PathVariable Integer idUtente
    ) {

        return ordineRepository.findByUtenteId(idUtente);

    }

}