package com.constructora.service;

import com.constructora.dto.ProyectoRequestDTO;
import com.constructora.dto.ProyectoResponseDTO;
import java.util.List;

public interface ProyectoService {
    List<ProyectoResponseDTO> obtenerTodos();
    List<ProyectoResponseDTO> obtenerDestacados();
    ProyectoResponseDTO obtenerPorId(Long id);
    ProyectoResponseDTO crear(ProyectoRequestDTO dto);
    ProyectoResponseDTO actualizar(Long id, ProyectoRequestDTO dto);
    void eliminar(Long id);
}
