# Cómo ejecutar la aplicación

Hay que arrancar tres cosas, **en este orden**, cada una en su propia
ventana de Terminal.

## 1. MySQL

```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

Pide la contraseña del Mac. Si dice `SUCCESS!`, listo.

## 2. Backend

```bash
cd ~/Desktop/"AppConstructora_ENTREGA 2"/2_backend
./mvnw spring-boot:run
```

Esperar a que aparezca `Started ConstructoraApplication`. Queda en
`http://localhost:8080`.

> Se usa `./mvnw` y no `mvn` para no depender de que Maven esté instalado:
> el wrapper descarga la versión correcta por su cuenta.

## 3. Frontend

```bash
cd ~/Desktop/"AppConstructora_ENTREGA 2"/3_frontend
npm install     # solo la primera vez
npm run dev
```

Abre `http://localhost:5173`.

Para la versión rediseñada, lo mismo pero en `4_frontend_modificado`:

```bash
npm run dev -- --port 5174
```

Así se pueden tener las dos abiertas a la vez y compararlas.

---

## Ver la base de datos

```bash
bash ~/Desktop/"AppConstructora_ENTREGA 2"/ver_base_de_datos.sh
```

Muestra las tablas, su estructura, las llaves foráneas, el contenido y
dos consultas con JOIN.

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| El backend no arranca | ¿Está MySQL corriendo? Paso 1 |
| La web carga pero sin datos | ¿Está el backend en el 8080? |
| `Access denied` de MySQL | Revisar `2_backend/local.properties` |
| Rojo en el editor pero todo funciona | Es el editor, no el código. Compila con `./mvnw clean compile` para confirmarlo |

## Documentos del proyecto

- `GUION_VIDEOS.md` — guion de los dos videos de sustentación
- `../README.md` — documentación técnica completa (está en la raíz porque
  es la que GitHub muestra en la portada del repositorio)
