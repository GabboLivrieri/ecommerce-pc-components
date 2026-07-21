package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Pagamento;
import com.betacom.ecommerce.repository.PagamentoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pagamenti")
public class PagamentoController {

        @Autowired
        private PagamentoRepository pagamentoRepository;

        @GetMapping
        public List<Pagamento> getAllPagamenti() {

                return pagamentoRepository.findAll();

        }

        @GetMapping("/ordine/{idOrdine}")
        public Pagamento getPagamentoOrdine(
                        @PathVariable Integer idOrdine) {

                return pagamentoRepository.findByOrdineId(idOrdine);

        }

        @PutMapping("/{id}/conferma")
        public Pagamento confermaPagamento(
                        @PathVariable Integer id,
                        @RequestParam String metodo) {

                Pagamento pagamento = pagamentoRepository.findById(id)
                                .orElseThrow(
                                                () -> new RuntimeException("Pagamento non trovato"));

                pagamento.setMetodo(metodo);

                pagamento.setStato("COMPLETATO");

                pagamento.setDataPagamento(
                                LocalDate.now());

                pagamento.getOrdine()
                                .setStato("PAGATO");

                return pagamentoRepository.save(pagamento);

        }

}