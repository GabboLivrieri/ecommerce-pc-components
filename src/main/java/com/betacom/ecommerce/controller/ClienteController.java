package com.betacom.ecommerce.controller;

import com.betacom.ecommerce.dto.ModificaClienteDTO;
import com.betacom.ecommerce.model.Cliente;
import com.betacom.ecommerce.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clienti")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;


    @GetMapping
    public List<Cliente> getAllClienti() {
        return clienteRepository.findAll();
    }


    @GetMapping("/{id}")
    public Cliente getClienteById(@PathVariable Integer id) {
        return clienteRepository.findById(id).orElse(null);
    }


    @PostMapping
    public Cliente saveCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }


    @PutMapping("/{id}")
    public Cliente modificaCliente(
            @PathVariable Integer id,
            @RequestBody ModificaClienteDTO dto
    ) {

        Cliente cliente = clienteRepository.findById(id).orElse(null);

        if (cliente == null) {
            return null;
        }

        cliente.setIndirizzo(dto.getIndirizzo());
        cliente.setCitta(dto.getCitta());
        cliente.setCap(dto.getCap());
        cliente.setTelefono(dto.getTelefono());

        return clienteRepository.save(cliente);
    }
}