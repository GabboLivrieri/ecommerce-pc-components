package com.betacom.ecommerce.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "valutazione_prodotto")
public class ValutazioneProdotto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_prodotto", nullable = false)
    private Prodotto prodotto;

    @ManyToOne
    @JoinColumn(name = "id_utente", nullable = false)
    private Utente utente;

    @Column(nullable = false)
    private Integer voto;

    @Column(columnDefinition = "TEXT")
    private String commento;
    

    
}