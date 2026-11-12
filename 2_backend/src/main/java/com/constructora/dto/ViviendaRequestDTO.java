package com.constructora.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import com.constructora.enums.TipoVivienda;

@Getter
@Setter
public class ViviendaRequestDTO {
    @NotBlank(message = "El título es obligatorio")
    private String titulo;

    @NotNull(message = "El tipo de vivienda es obligatorio")
    private TipoVivienda tipo;

    @Min(value = 0, message = "Las habitaciones deben ser cero o mayor")
    private Integer habitaciones;

    @Min(value = 0, message = "Los baños deben ser cero o mayor")
    private Integer banos;

    @DecimalMin(value = "0.01", message = "El área debe ser cero o mayor", inclusive = true)
    private Double area;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor que cero")
    private BigDecimal precio;

    private String imageUrl;

    private Boolean disponible;

    @NotNull(message = "El proyecto es obligatorio")
    private Long proyectoId;
}
