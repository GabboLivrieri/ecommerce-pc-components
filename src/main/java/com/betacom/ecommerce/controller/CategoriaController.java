package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.model.Categoria;
import com.betacom.ecommerce.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorie")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> getAllCategorie() {
        return categoriaRepository.findAll();
    }
}