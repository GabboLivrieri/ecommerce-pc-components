package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Venditore;
import com.betacom.ecommerce.repository.VenditoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.betacom.ecommerce.dto.ModificaVenditoreDTO;
import java.util.List;

@RestController
@RequestMapping("/api/venditori")
public class VenditoreController {

    @Autowired
    private VenditoreRepository venditoreRepository;

    @GetMapping
    public List<Venditore> getAllVenditori() {
        return venditoreRepository.findAll();
    }

    @GetMapping("/{id}")
    public Venditore getVenditoreById(@PathVariable Integer id) {
        return venditoreRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Venditore saveVenditore(@RequestBody Venditore venditore) {
        return venditoreRepository.save(venditore);
    }

    @PutMapping("/{id}")
    public Venditore modificaVenditore(
        @PathVariable Integer id,
        @RequestBody ModificaVenditoreDTO dto
) {

    Venditore venditore = venditoreRepository.findById(id).orElse(null);

    if (venditore == null) {
        return null;
    }

    venditore.setNomeAzienda(dto.getNomeAzienda());
    venditore.setPartitaIva(dto.getPartitaIva());
    venditore.setTelefono(dto.getTelefono());

    return venditoreRepository.save(venditore);
}
}