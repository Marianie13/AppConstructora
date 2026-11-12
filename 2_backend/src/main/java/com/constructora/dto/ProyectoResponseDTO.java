package com.constructora.dto;

import java.math.BigDecimal;
import com.constructora.enums.EstadoProyecto;

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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public BigDecimal getPrecioDesde() { return precioDesde; }
    public void setPrecioDesde(BigDecimal precioDesde) { this.precioDesde = precioDesde; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public EstadoProyecto getEstado() { return estado; }
    public void setEstado(EstadoProyecto estado) { this.estado = estado; }

    public Boolean getDestacado() { return destacado; }
    public void setDestacado(Boolean destacado) { this.destacado = destacado; }
}
