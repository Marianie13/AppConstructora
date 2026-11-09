package com.constructora.mapper;

import com.constructora.dto.ClienteInteresadoRequestDTO;
import com.constructora.dto.ClienteInteresadoResponseDTO;
import com.constructora.entity.ClienteInteresado;
import com.constructora.entity.Proyecto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ClienteInteresadoMapper {

    public ClienteInteresadoResponseDTO toResponseDTO(ClienteInteresado cliente) {
        if (cliente == null) return null;
        ClienteInteresadoResponseDTO dto = new ClienteInteresadoResponseDTO();
        dto.setId(cliente.getId());
        dto.setNombre(cliente.getNombre());
        dto.setTelefono(cliente.getTelefono());
        dto.setCorreo(cliente.getCorreo());
        dto.setMensaje(cliente.getMensaje());
        dto.setFechaRegistro(cliente.getFechaRegistro());
        if (cliente.getProyecto() != null) {
            dto.setProyectoId(cliente.getProyecto().getId());
            dto.setProyectoNombre(cliente.getProyecto().getNombre());
        }
        return dto;
    }

    public ClienteInteresado toEntity(ClienteInteresadoRequestDTO dto, Proyecto proyecto) {
        if (dto == null) return null;
        ClienteInteresado cliente = new ClienteInteresado();
        cliente.setNombre(dto.getNombre());
        cliente.setTelefono(dto.getTelefono());
        cliente.setCorreo(dto.getCorreo());
        cliente.setMensaje(dto.getMensaje());
        cliente.setFechaRegistro(LocalDateTime.now());
        cliente.setProyecto(proyecto);
        return cliente;
    }
}
