package com.betacom.ecommerce.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_utente", nullable = false, unique = true)
    private Utente utente;

    @Column(length = 100)
    private String indirizzo;

    @Column(length = 50)
    private String citta;

    @Column(length = 10)
    private String cap;

    @Column(length = 20)
    private String telefono;

 
}