package com.betacom.ecommerce.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "pagamento")
public class Pagamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

   @OneToOne
    @JoinColumn(name = "id_ordine", nullable = false, unique = true)
    private Ordine ordine;

    @Column(nullable = false, length = 50)
    private String metodo;

    @Column(nullable = false, length = 30)
    private String stato;

    @Column(name = "data_pagamento")
    private LocalDate dataPagamento;

}