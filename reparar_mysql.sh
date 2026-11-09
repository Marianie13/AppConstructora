#!/bin/bash
# ---------------------------------------------------------------
# Restablece la clave de root de MySQL y deja instalada la base de
# datos del proyecto en una sola pasada.
#
# Uso:   sudo bash reparar_mysql.sh
#
# Que hace, en orden:
#   1. Detiene MySQL.
#   2. Lo arranca en modo sin verificacion de claves.
#   3. Asigna la nueva clave de root que tu escribas.
#   4. Vuelve a arrancar MySQL normalmente.
#   5. Crea constructora_db con sus tablas y datos de prueba.
#   6. Crea el usuario constructora_app que usa el backend.
#   7. Muestra las consultas de verificacion.
# ---------------------------------------------------------------

set -u

BIN="/usr/local/mysql/bin"
SERVER="/usr/local/mysql/support-files/mysql.server"
SOCK="/tmp/mysql.sock"
DIR="$(cd "$(dirname "$0")" && pwd)"

# Usuario que va a usar el backend. La clave se genera al azar en cada
# instalacion y se guarda unicamente en 2_backend/local.properties,
# que esta excluido del repositorio.
APP_USER="constructora_app"
APP_PASS="$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 24)"

rojo()  { printf "\033[31m%s\033[0m\n" "$1"; }
verde() { printf "\033[32m%s\033[0m\n" "$1"; }
paso()  { printf "\n\033[1m==> %s\033[0m\n" "$1"; }

if [ "$(id -u)" -ne 0 ]; then
  rojo "Este script necesita sudo. Ejecuta:"
  echo "   sudo bash \"$0\""
  exit 1
fi

if [ ! -x "$BIN/mysqld_safe" ]; then
  rojo "No encuentro MySQL en /usr/local/mysql"
  exit 1
fi

echo "=================================================="
echo "  Reparacion de MySQL + instalacion de la base"
echo "=================================================="
echo ""
echo "Vas a elegir una NUEVA clave para el usuario root de MySQL."
echo "Anotala en algun lado: la vas a necesitar mas adelante."
echo "(Mientras escribes no se vera nada en pantalla.)"
echo ""

printf "Nueva clave de root: "
read -r -s NUEVA
echo ""
printf "Escribela otra vez:  "
read -r -s NUEVA2
echo ""

if [ -z "$NUEVA" ]; then
  rojo "La clave no puede quedar vacia."
  exit 1
fi
if [ "$NUEVA" != "$NUEVA2" ]; then
  rojo "Las dos claves no coinciden. Vuelve a ejecutar el script."
  exit 1
fi

# ---------------------------------------------------------------
paso "1/6  Deteniendo MySQL"
"$SERVER" stop >/dev/null 2>&1
pkill -f mysqld_safe >/dev/null 2>&1
pkill -x mysqld >/dev/null 2>&1
for _ in $(seq 1 20); do
  pgrep -x mysqld >/dev/null 2>&1 || break
  sleep 1
done
verde "MySQL detenido."

# ---------------------------------------------------------------
paso "2/6  Arrancando MySQL en modo de recuperacion"
"$BIN/mysqld_safe" --skip-grant-tables --skip-networking --user=_mysql >/dev/null 2>&1 &

LISTO=no
for _ in $(seq 1 40); do
  if "$BIN/mysqladmin" --socket="$SOCK" ping >/dev/null 2>&1; then
    LISTO=si
    break
  fi
  sleep 1
done

if [ "$LISTO" != "si" ]; then
  rojo "MySQL no arranco en modo de recuperacion."
  echo "Revisa el log de errores en /usr/local/mysql/data/*.err"
  exit 1
fi
verde "Modo de recuperacion activo."

# ---------------------------------------------------------------
paso "3/6  Asignando la nueva clave de root"
"$BIN/mysql" --socket="$SOCK" -u root <<SQL
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY '$NUEVA';
FLUSH PRIVILEGES;
SQL
if [ $? -ne 0 ]; then
  rojo "No se pudo cambiar la clave."
  pkill -f mysqld_safe >/dev/null 2>&1
  exit 1
fi
verde "Clave de root actualizada."

# ---------------------------------------------------------------
paso "4/6  Reiniciando MySQL en modo normal"
pkill -f mysqld_safe >/dev/null 2>&1
pkill -x mysqld >/dev/null 2>&1
for _ in $(seq 1 20); do
  pgrep -x mysqld >/dev/null 2>&1 || break
  sleep 1
done

"$SERVER" start >/dev/null 2>&1
LISTO=no
for _ in $(seq 1 40); do
  if "$BIN/mysqladmin" ping >/dev/null 2>&1; then
    LISTO=si
    break
  fi
  sleep 1
done
if [ "$LISTO" != "si" ]; then
  rojo "MySQL no volvio a arrancar en modo normal."
  exit 1
fi

if ! "$BIN/mysql" --default-character-set=utf8mb4 -u root -p"$NUEVA" -e "SELECT VERSION();" >/dev/null 2>&1; then
  rojo "La nueva clave no funciono. Vuelve a ejecutar el script."
  exit 1
fi
verde "MySQL arriba y la nueva clave funciona."

# ---------------------------------------------------------------
correr() { "$BIN/mysql" --default-character-set=utf8mb4 -u root -p"$NUEVA" "$@"; }

paso "5/6  Creando la base de datos del proyecto"
correr < "$DIR/1_base_de_datos/01_app_constructora_schema.sql" || { rojo "Fallo el script 01"; exit 1; }
echo "   - Tablas creadas."
correr < "$DIR/1_base_de_datos/02_app_constructora_datos.sql" || { rojo "Fallo el script 02"; exit 1; }
echo "   - Datos de prueba insertados."

correr -e "
CREATE USER IF NOT EXISTS '$APP_USER'@'localhost' IDENTIFIED BY '$APP_PASS';
ALTER USER '$APP_USER'@'localhost' IDENTIFIED BY '$APP_PASS';
GRANT ALL PRIVILEGES ON constructora_db.* TO '$APP_USER'@'localhost';
FLUSH PRIVILEGES;
" || { rojo "No se pudo crear el usuario de la aplicacion"; exit 1; }
echo "   - Usuario $APP_USER creado."

# ---------------------------------------------------------------
paso "6/6  Verificacion"
correr --table < "$DIR/1_base_de_datos/03_consultas_verificacion.sql"

echo ""
echo "Resumen de registros:"
correr --table -e "
USE constructora_db;
SELECT 'proyectos' AS tabla, COUNT(*) AS registros FROM proyectos
UNION ALL SELECT 'viviendas', COUNT(*) FROM viviendas
UNION ALL SELECT 'clientes_interesados', COUNT(*) FROM clientes_interesados;
"

echo ""
echo "Prueba de conexion del backend (usuario $APP_USER):"
if "$BIN/mysql" --default-character-set=utf8mb4 -u "$APP_USER" -p"$APP_PASS" -e "USE constructora_db; SELECT COUNT(*) AS proyectos FROM proyectos;" 2>/dev/null; then
  verde "El backend podra conectarse sin problema."
else
  rojo "El usuario de la aplicacion no pudo conectarse."
  exit 1
fi

echo ""
echo "=================================================="
verde " TODO LISTO"
echo "=================================================="
echo ""
echo "Siguiente paso, en una terminal normal (sin sudo):"
echo "   cd \"$DIR/2_backend\""
echo "   mvn spring-boot:run"
echo ""
