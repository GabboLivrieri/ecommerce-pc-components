package com.betacom.ecommerce.repository;

import com.betacom.ecommerce.model.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, Integer> {

    boolean existsByOrdineId(Integer idOrdine);
    Pagamento findByOrdineId(Integer idOrdine);

}