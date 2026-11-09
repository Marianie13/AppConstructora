package com.constructora.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import com.constructora.enums.EstadoProyecto;

@Getter
@Setter
public class ProyectoResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String ciudad;
    private String direccion;
    private BigDecimal precioDesde;
    private String imageUrl;
    private EstadoProyecto estado;
    private Boolean destacado;
}
