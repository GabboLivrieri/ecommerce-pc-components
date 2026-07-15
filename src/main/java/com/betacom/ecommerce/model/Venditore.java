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

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Utente getUtente() {
		return utente;
	}

	public void setUtente(Utente utente) {
		this.utente = utente;
	}

	public String getNomeAzienda() {
		return nomeAzienda;
	}

	public void setNomeAzienda(String nomeAzienda) {
		this.nomeAzienda = nomeAzienda;
	}

	public String getPartitaIva() {
		return partitaIva;
	}

	public void setPartitaIva(String partitaIva) {
		this.partitaIva = partitaIva;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
}