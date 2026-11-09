package com.constructora.repository;

import com.constructora.entity.ClienteInteresado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ClienteInteresadoRepository extends JpaRepository<ClienteInteresado, Long> {
    List<ClienteInteresado> findByProyectoId(Long proyectoId);
}
