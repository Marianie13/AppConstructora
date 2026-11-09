USE constructora_db;

INSERT INTO proyectos (nombre, descripcion, ciudad, direccion, precio_desde, image_url, estado, destacado) VALUES
('Villas del Sol', 'Conjunto residencial con amplias zonas verdes y club house.', 'Bogotá', 'Calle 100 #15-20', 280000000.00, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', 'EN_CONSTRUCCION', TRUE),
('Torres del Parque', 'Apartamentos con vista al parque y excelente ubicación.', 'Medellín', 'Carrera 43A #1-50', 350000000.00, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800', 'ENTREGA_INMEDIATA', TRUE),
('Campestre La Pradera', 'Lotes campestres para construir la casa de tus sueños.', 'Cali', 'Km 5 Vía Cali-Jamundí', 150000000.00, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cd2e?w=800', 'EN_PLANOS', FALSE);

INSERT INTO viviendas (titulo, tipo, habitaciones, banos, area, precio, image_url, disponible, proyecto_id) VALUES
('Casa Tipo A', 'CASA', 3, 2, 120.0, 320000000.00, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', TRUE, 1),
('Casa Tipo B', 'CASA', 4, 3, 150.0, 380000000.00, 'https://images.unsplash.com/photo-1605276374101-de4c0a9ecd6a?w=800', TRUE, 1),
('Apartamento 801', 'APARTAMENTO', 2, 2, 75.0, 350000000.00, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', TRUE, 2),
('Apartamento 1202', 'APARTAMENTO', 3, 2, 95.0, 420000000.00, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', FALSE, 2),
('Lote Premium', 'LOTE', 0, 0, 300.0, 180000000.00, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', TRUE, 3),
('Lote Estándar', 'LOTE', 0, 0, 250.0, 150000000.00, 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800', TRUE, 3);

INSERT INTO clientes_interesados (nombre, telefono, correo, mensaje, fecha_registro, proyecto_id) VALUES
('María González', '3001234567', 'maria@email.com', 'Me interesa conocer más sobre las casas del proyecto.', NOW(), 1),
('Carlos Ruiz', '3109876543', 'carlos@email.com', 'Quisiera agendar una visita al apartamento 801.', NOW(), 2),
('Ana López', '3205551234', 'ana@email.com', 'Busco un lote para construir mi casa campestre.', NOW(), 3);
