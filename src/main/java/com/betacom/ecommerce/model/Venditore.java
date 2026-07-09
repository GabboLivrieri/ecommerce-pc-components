package com.betacom.ecommerce.model;

import jakarta.persistence.*;

@Entity
@Table(name = "venditore")
public class Venditore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_utente", nullable = false, unique = true)
    private Utente utente;

    @Column(name = "nome_azienda", length = 100)
    private String nomeAzienda;

    @Column(name = "partita_iva", length = 20)
    private String partitaIva;

    @Column(length = 20)
    private String telefono;
    }