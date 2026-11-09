package com.constructora.entity;

import com.constructora.enums.TipoVivienda;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "viviendas")
@Getter
@Setter
public class Vivienda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    // Mismo caso que el estado del proyecto: se persiste como VARCHAR(50).
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(length = 50)
    private TipoVivienda tipo;

    private Integer habitaciones;
    private Integer banos;
    private Double area;
    private BigDecimal precio;
    private String imageUrl;
    private Boolean disponible;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proyecto_id")
    private Proyecto proyecto;
}
