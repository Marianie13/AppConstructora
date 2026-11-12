package com.constructora.service.impl;

import com.constructora.dto.ProyectoRequestDTO;
import com.constructora.dto.ProyectoResponseDTO;
import com.constructora.entity.Proyecto;
import com.constructora.exception.ResourceNotFoundException;
import com.constructora.mapper.ProyectoMapper;
import com.constructora.repository.ProyectoRepository;
import com.constructora.service.ProyectoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProyectoServiceImpl implements ProyectoService {

    private final ProyectoRepository proyectoRepository;
    private final ProyectoMapper mapper;

    public ProyectoServiceImpl(ProyectoRepository proyectoRepository, ProyectoMapper mapper) {
        this.proyectoRepository = proyectoRepository;
        this.mapper = mapper;
    }

    @Override
    public List<ProyectoResponseDTO> obtenerTodos() {
        return proyectoRepository.findAll().stream()
                .map(mapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProyectoResponseDTO> obtenerDestacados() {
        return proyectoRepository.findByDestacadoTrue().stream()
                .map(mapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProyectoResponseDTO obtenerPorId(Long id) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el proyecto con el ID: " + id));
        return mapper.toResponseDTO(proyecto);
    }

    @Override
    public ProyectoResponseDTO crear(ProyectoRequestDTO dto) {
        Proyecto proyecto = mapper.toEntity(dto);
        Proyecto guardado = proyectoRepository.save(proyecto);
        return mapper.toResponseDTO(guardado);
    }

    @Override
    public ProyectoResponseDTO actualizar(Long id, ProyectoRequestDTO dto) {
        Proyecto proyecto = proyectoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el proyecto con el ID: " + id));

        mapper.updateEntity(proyecto, dto);

        Proyecto actualizado = proyectoRepository.save(proyecto);
        return mapper.toResponseDTO(actualizado);
    }

    @Override
    public void eliminar(Long id) {
        if (!proyectoRepository.existsById(id)) {
            throw new ResourceNotFoundException("No se encontró el proyecto con el ID: " + id);
        }
        proyectoRepository.deleteById(id);
    }
}
