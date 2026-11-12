package com.constructora.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import com.constructora.enums.TipoVivienda;

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

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public TipoVivienda getTipo() { return tipo; }
    public void setTipo(TipoVivienda tipo) { this.tipo = tipo; }

    public Integer getHabitaciones() { return habitaciones; }
    public void setHabitaciones(Integer habitaciones) { this.habitaciones = habitaciones; }

    public Integer getBanos() { return banos; }
    public void setBanos(Integer banos) { this.banos = banos; }

    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getDisponible() { return disponible; }
    public void setDisponible(Boolean disponible) { this.disponible = disponible; }

    public Long getProyectoId() { return proyectoId; }
    public void setProyectoId(Long proyectoId) { this.proyectoId = proyectoId; }
}
