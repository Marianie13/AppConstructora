#!/bin/bash
# ---------------------------------------------------------------
# Visor de la base de datos para la sustentacion.
# Muestra la estructura y el contenido de constructora_db.
#
# Uso:  bash ver_base_de_datos.sh
# ---------------------------------------------------------------

DIR="$(cd "$(dirname "$0")" && pwd)"
MY="/usr/local/mysql/bin/mysql"
PROPS="$DIR/2_backend/local.properties"

USUARIO=$(grep '^DB_USER=' "$PROPS" | cut -d= -f2)
CLAVE=$(grep '^DB_PASSWORD=' "$PROPS" | cut -d= -f2)

correr() { "$MY" --default-character-set=utf8mb4 --table -u "$USUARIO" -p"$CLAVE" constructora_db -e "$1" 2>/dev/null; }

titulo() {
  echo ""
  printf "\033[1;36m%s\033[0m\n" "──────────────────────────────────────────────────────────"
  printf "\033[1;36m  %s\033[0m\n" "$1"
  printf "\033[1;36m%s\033[0m\n" "──────────────────────────────────────────────────────────"
}

clear
printf "\033[1;33m"
cat <<'BANNER'
   ____                _                   _
  / ___|___  _ __  ___| |_ _ __ _   _  ___| |_ ___  _ __ __ _
 | |   / _ \| '_ \/ __| __| '__| | | |/ __| __/ _ \| '__/ _` |
 | |__| (_) | | | \__ \ |_| |  | |_| | (__| || (_) | | | (_| |
  \____\___/|_| |_|___/\__|_|   \__,_|\___|\__\___/|_|  \__,_|

                    Base de datos: constructora_db
BANNER
printf "\033[0m\n"

titulo "1. TABLAS DE LA BASE DE DATOS"
correr "SHOW TABLES;"

titulo "2. ESTRUCTURA DE LA TABLA proyectos"
correr "DESCRIBE proyectos;"

titulo "3. ESTRUCTURA DE LA TABLA viviendas"
correr "DESCRIBE viviendas;"

titulo "4. ESTRUCTURA DE LA TABLA clientes_interesados"
correr "DESCRIBE clientes_interesados;"

titulo "5. LLAVES FORANEAS (las relaciones entre tablas)"
correr "
SELECT
  TABLE_NAME            AS 'tabla',
  COLUMN_NAME           AS 'columna',
  REFERENCED_TABLE_NAME AS 'apunta a',
  CONSTRAINT_NAME       AS 'nombre de la FK'
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'constructora_db'
  AND REFERENCED_TABLE_NAME IS NOT NULL;"

titulo "6. CONTENIDO: proyectos"
correr "SELECT id, nombre, ciudad, estado, precio_desde, destacado FROM proyectos;"

titulo "7. CONTENIDO: viviendas"
correr "SELECT id, titulo, tipo, habitaciones, banos, area, precio, disponible, proyecto_id FROM viviendas;"

titulo "8. CONTENIDO: clientes_interesados"
correr "SELECT id, nombre, telefono, correo, fecha_registro, proyecto_id FROM clientes_interesados;"

titulo "9. CONSULTA CON JOIN: viviendas disponibles y su proyecto"
correr "
SELECT v.titulo AS vivienda, v.tipo, v.precio, p.nombre AS proyecto, p.ciudad
FROM viviendas v
JOIN proyectos p ON v.proyecto_id = p.id
WHERE v.disponible = TRUE;"

titulo "10. CONSULTA CON JOIN: interesados por proyecto"
correr "
SELECT c.nombre AS cliente, c.telefono, p.nombre AS 'proyecto de interes', c.fecha_registro
FROM clientes_interesados c
JOIN proyectos p ON c.proyecto_id = p.id;"

titulo "11. RESUMEN"
correr "
SELECT 'proyectos' AS tabla, COUNT(*) AS registros FROM proyectos
UNION ALL SELECT 'viviendas', COUNT(*) FROM viviendas
UNION ALL SELECT 'clientes_interesados', COUNT(*) FROM clientes_interesados;"

echo ""
