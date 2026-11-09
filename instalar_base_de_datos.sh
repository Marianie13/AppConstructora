#!/bin/bash
# ---------------------------------------------------------------
# Instala la base de datos del proyecto AppConstructora.
#
# Crea la base constructora_db, sus tablas, los datos de prueba y
# un usuario dedicado para la aplicacion. Te va a pedir la clave
# de root de MySQL: se escribe directamente en MySQL y no queda
# guardada en ningun archivo.
#
# Uso:  bash instalar_base_de_datos.sh
# ---------------------------------------------------------------

set -e

MYSQL="/usr/local/mysql/bin/mysql"
DIR="$(cd "$(dirname "$0")" && pwd)"

# Usuario que va a usar el backend. La clave se genera al azar en cada
# instalacion y se guarda unicamente en 2_backend/local.properties,
# que esta excluido del repositorio.
APP_USER="constructora_app"
APP_PASS="$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 24)"

if [ ! -x "$MYSQL" ]; then
  echo "No encuentro MySQL en $MYSQL"
  exit 1
fi

echo "=============================================="
echo " Instalacion de la base de datos constructora"
echo "=============================================="
echo ""
echo "Escribe la clave de root de MySQL (no se vera mientras escribes):"
read -r -s ROOT_PASS
echo ""

run_root() {
  "$MYSQL" --default-character-set=utf8mb4 -u root -p"$ROOT_PASS" "$@"
}

echo "-> Verificando conexion..."
run_root -e "SELECT VERSION();" > /dev/null
echo "   Conexion correcta."

echo "-> 1/3 Creando base de datos y tablas..."
run_root < "$DIR/1_base_de_datos/01_app_constructora_schema.sql"

echo "-> 2/3 Insertando datos de prueba..."
run_root < "$DIR/1_base_de_datos/02_app_constructora_datos.sql"

echo "-> Creando el usuario de la aplicacion ($APP_USER)..."
run_root -e "
CREATE USER IF NOT EXISTS '$APP_USER'@'localhost' IDENTIFIED BY '$APP_PASS';
ALTER USER '$APP_USER'@'localhost' IDENTIFIED BY '$APP_PASS';
GRANT ALL PRIVILEGES ON constructora_db.* TO '$APP_USER'@'localhost';
FLUSH PRIVILEGES;
"

echo "-> 3/3 Consultas de verificacion:"
echo ""
run_root --table < "$DIR/1_base_de_datos/03_consultas_verificacion.sql"

echo ""
echo "-> Resumen de registros creados:"
run_root --table -e "
USE constructora_db;
SELECT 'proyectos' AS tabla, COUNT(*) AS registros FROM proyectos
UNION ALL SELECT 'viviendas', COUNT(*) FROM viviendas
UNION ALL SELECT 'clientes_interesados', COUNT(*) FROM clientes_interesados;
"

echo ""
echo "=============================================="
echo " Base de datos instalada correctamente."
echo "=============================================="
