package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.*;
import com.betacom.ecommerce.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pagamenti")
public class PagamentoController {

    @Autowired
    private PagamentoRepository pagamentoRepository;

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

    @Autowired
    private ProdottoRepository prodottoRepository;

    @GetMapping
    public List<Pagamento> getAllPagamenti() {

        return pagamentoRepository.findAll();

    }

    @PostMapping("/crea/{idUtente}")
    public Pagamento creaPagamento(
            @PathVariable Integer idUtente,
            @RequestParam String metodo) {

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

        for (CarrelloProdotto cp : prodotti) {

            if (cp.getProdotto().getQuantita() < cp.getQuantita()) {
                return null;
            }

        }

        Ordine ordine = new Ordine();

        ordine.setUtente(utente);
        ordine.setDataOrdine(LocalDate.now());
        ordine.setTotale(BigDecimal.ZERO);
        ordine.setStato("PAGATO");

        ordine = ordineRepository.save(ordine);

        BigDecimal totale = BigDecimal.ZERO;

        for (CarrelloProdotto cp : prodotti) {

            Prodotto prodotto = cp.getProdotto();

            prodotto.setQuantita(
                    prodotto.getQuantita() - cp.getQuantita());

            prodottoRepository.save(prodotto);

            OrdineProdotto op = new OrdineProdotto();

            op.setOrdine(ordine);
            op.setProdotto(prodotto);
            op.setQuantita(cp.getQuantita());
            op.setPrezzo(prodotto.getPrezzo());

            ordineProdottoRepository.save(op);

            totale = totale.add(
                    prodotto.getPrezzo()
                            .multiply(
                                    BigDecimal.valueOf(cp.getQuantita())));

        }

        ordine.setTotale(totale);

        ordineRepository.save(ordine);

        Pagamento pagamento = new Pagamento();

        pagamento.setOrdine(ordine);
        pagamento.setMetodo(metodo);
        pagamento.setStato("COMPLETATO");
        pagamento.setDataPagamento(LocalDate.now());

        Pagamento risultato = pagamentoRepository.save(pagamento);

        carrelloProdottoRepository.deleteAll(prodotti);

        return risultato;

    }

    @GetMapping("/ordine/{idOrdine}")
    public Pagamento getPagamentoOrdine(
            @PathVariable Integer idOrdine) {

        return pagamentoRepository.findByOrdineId(idOrdine);

    }

}