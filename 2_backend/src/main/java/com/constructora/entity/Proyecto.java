package com.constructora.entity;

import com.constructora.enums.EstadoProyecto;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "proyectos")
@Getter
@Setter
public class Proyecto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private String ciudad;
    private String direccion;
    private BigDecimal precioDesde;
    private String imageUrl;

    // Se guarda el nombre del enum como texto. @JdbcTypeCode fuerza VARCHAR
    // porque Hibernate 6, por defecto, esperaria el tipo ENUM nativo de MySQL
    // y la tabla esta declarada como VARCHAR(50) en el script SQL.
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Column(length = 50)
    private EstadoProyecto estado;

    private Boolean destacado;
}
