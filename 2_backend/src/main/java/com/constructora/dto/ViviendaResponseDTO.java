package com.constructora.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import com.constructora.enums.TipoVivienda;

@Getter
@Setter
public class ViviendaResponseDTO {
    private Long id;
    private String titulo;
    private TipoVivienda tipo;
    private Integer habitaciones;
    private Integer banos;
    private Double area;
    private BigDecimal precio;
    private String imageUrl;
    private Boolean disponible;
    private Long proyectoId;
    private String proyectoNombre;
}
