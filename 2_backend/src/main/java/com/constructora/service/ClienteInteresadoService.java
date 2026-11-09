package com.constructora.service;

import com.constructora.dto.ClienteInteresadoRequestDTO;
import com.constructora.dto.ClienteInteresadoResponseDTO;
import java.util.List;

public interface ClienteInteresadoService {
    List<ClienteInteresadoResponseDTO> obtenerTodos();
    List<ClienteInteresadoResponseDTO> obtenerPorProyecto(Long proyectoId);
    ClienteInteresadoResponseDTO obtenerPorId(Long id);
    ClienteInteresadoResponseDTO crear(ClienteInteresadoRequestDTO dto);
    void eliminar(Long id);
}
