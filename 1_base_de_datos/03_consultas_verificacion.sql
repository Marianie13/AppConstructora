USE constructora_db;

-- Ver todos los proyectos
SELECT * FROM proyectos;

-- Ver proyectos destacados
SELECT * FROM proyectos WHERE destacado = TRUE;

-- Ver viviendas disponibles con el nombre de su proyecto asociado
SELECT v.id, v.titulo, v.tipo, v.precio, v.disponible, p.nombre AS proyecto_nombre
FROM viviendas v
JOIN proyectos p ON v.proyecto_id = p.id
WHERE v.disponible = TRUE;

-- Ver clientes interesados y el proyecto por el cual preguntaron
SELECT c.id, c.nombre, c.telefono, c.correo, c.mensaje, c.fecha_registro, p.nombre AS proyecto_interes
FROM clientes_interesados c
JOIN proyectos p ON c.proyecto_id = p.id;
