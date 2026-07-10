package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Pagamento;
import com.betacom.ecommerce.repository.PagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping
    public Pagamento registraPagamento(@RequestBody Pagamento pagamento) {
        return pagamentoRepository.save(pagamento);
    }
}