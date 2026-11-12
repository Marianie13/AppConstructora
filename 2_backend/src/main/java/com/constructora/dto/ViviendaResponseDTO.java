package com.constructora.dto;

import java.math.BigDecimal;
import com.constructora.enums.TipoVivienda;

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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public String getProyectoNombre() { return proyectoNombre; }
    public void setProyectoNombre(String proyectoNombre) { this.proyectoNombre = proyectoNombre; }
}
