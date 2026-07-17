package com.betacom.ecommerce.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ordine")
public class Ordine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @ManyToOne
    @JoinColumn(name = "id_utente", nullable = false)
    private Utente utente;


    @Column(name = "data_ordine", nullable = false)
    private LocalDate dataOrdine;


    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totale;


    @Column(nullable = false, length = 30)
    private String stato;

}