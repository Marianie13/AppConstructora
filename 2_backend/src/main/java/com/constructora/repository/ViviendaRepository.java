package com.constructora.repository;

import com.constructora.entity.Vivienda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ViviendaRepository extends JpaRepository<Vivienda, Long> {
    List<Vivienda> findByProyectoId(Long proyectoId);
    List<Vivienda> findByDisponibleTrue();
}
