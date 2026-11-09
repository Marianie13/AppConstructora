package com.constructora.mapper;

import com.constructora.dto.ProyectoRequestDTO;
import com.constructora.dto.ProyectoResponseDTO;
import com.constructora.entity.Proyecto;
import org.springframework.stereotype.Component;

@Component
public class ProyectoMapper {

    public ProyectoResponseDTO toResponseDTO(Proyecto proyecto) {
        if (proyecto == null) return null;
        ProyectoResponseDTO dto = new ProyectoResponseDTO();
        dto.setId(proyecto.getId());
        dto.setNombre(proyecto.getNombre());
        dto.setDescripcion(proyecto.getDescripcion());
        dto.setCiudad(proyecto.getCiudad());
        dto.setDireccion(proyecto.getDireccion());
        dto.setPrecioDesde(proyecto.getPrecioDesde());
        dto.setImageUrl(proyecto.getImageUrl());
        dto.setEstado(proyecto.getEstado());
        dto.setDestacado(proyecto.getDestacado());
        return dto;
    }

    public Proyecto toEntity(ProyectoRequestDTO dto) {
        if (dto == null) return null;
        Proyecto proyecto = new Proyecto();
        proyecto.setNombre(dto.getNombre());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setCiudad(dto.getCiudad());
        proyecto.setDireccion(dto.getDireccion());
        proyecto.setPrecioDesde(dto.getPrecioDesde());
        proyecto.setImageUrl(dto.getImageUrl());
        proyecto.setEstado(dto.getEstado());
        proyecto.setDestacado(dto.getDestacado() != null ? dto.getDestacado() : false);
        return proyecto;
    }

    public void updateEntity(Proyecto proyecto, ProyectoRequestDTO dto) {
        if (proyecto == null || dto == null) return;
        proyecto.setNombre(dto.getNombre());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setCiudad(dto.getCiudad());
        proyecto.setDireccion(dto.getDireccion());
        proyecto.setPrecioDesde(dto.getPrecioDesde());
        proyecto.setImageUrl(dto.getImageUrl());
        proyecto.setEstado(dto.getEstado());
        if (dto.getDestacado() != null) {
            proyecto.setDestacado(dto.getDestacado());
        }
    }
}
