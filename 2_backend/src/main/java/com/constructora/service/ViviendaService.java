package com.constructora.service;

import com.constructora.dto.ViviendaRequestDTO;
import com.constructora.dto.ViviendaResponseDTO;
import java.util.List;

public interface ViviendaService {
    List<ViviendaResponseDTO> obtenerTodas();
    List<ViviendaResponseDTO> obtenerDisponibles();
    List<ViviendaResponseDTO> obtenerPorProyecto(Long proyectoId);
    ViviendaResponseDTO obtenerPorId(Long id);
    ViviendaResponseDTO crear(ViviendaRequestDTO dto);
    ViviendaResponseDTO actualizar(Long id, ViviendaRequestDTO dto);
    void eliminar(Long id);
}
