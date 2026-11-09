CREATE DATABASE IF NOT EXISTS constructora_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE constructora_db;

DROP TABLE IF EXISTS clientes_interesados;
DROP TABLE IF EXISTS viviendas;
DROP TABLE IF EXISTS proyectos;

CREATE TABLE proyectos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    direccion VARCHAR(150),
    precio_desde DECIMAL(15, 2) NOT NULL,
    image_url VARCHAR(255),
    estado VARCHAR(50) NOT NULL,
    destacado BOOLEAN DEFAULT FALSE
);

CREATE TABLE viviendas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    habitaciones INT DEFAULT 0,
    banos INT DEFAULT 0,
    area DOUBLE NOT NULL,
    precio DECIMAL(15, 2) NOT NULL,
    image_url VARCHAR(255),
    disponible BOOLEAN DEFAULT TRUE,
    proyecto_id BIGINT NOT NULL,
    CONSTRAINT fk_vivienda_proyecto FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE
);

CREATE TABLE clientes_interesados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_registro DATETIME NOT NULL,
    proyecto_id BIGINT NOT NULL,
    CONSTRAINT fk_cliente_proyecto FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE
);
