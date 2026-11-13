# AppConstructora — Habita Constructora

**Asignatura:** Construcción de Software
**Autora:** Marianie Vásquez

Aplicación web de gestión gerencial para una constructora: administra proyectos
inmobiliarios, las viviendas que los componen y los clientes que registran
interés desde el sitio público.

---

## 1. Arquitectura

La aplicación tiene tres capas independientes que se comunican por HTTP:

```
┌─────────────────────┐      HTTP/JSON       ┌──────────────────────┐      JDBC      ┌──────────────┐
│   FRONTEND          │ ───────────────────► │   BACKEND            │ ─────────────► │   MySQL      │
│   React + Vite      │ ◄─────────────────── │   Spring Boot (Java) │ ◄───────────── │ constructora │
│   puerto 5173       │                      │   puerto 8080        │                │    _db       │
└─────────────────────┘                      └──────────────────────┘                └──────────────┘
```

| Carpeta | Contenido |
|---|---|
| `1_base_de_datos/` | Scripts SQL: esquema, datos de prueba, consultas de verificación y el export completo de la base |
| `2_backend/` | API REST en Spring Boot 3.2 + Java 17 + JPA/Hibernate |
| `3_frontend/` | Interfaz web original (React 18 + Vite + Tailwind CSS) |
| `4_frontend_modificado/` | La misma interfaz con el rediseño propio (tema oscuro "Habita") |

---

## 2. Modelo de datos

```
Proyecto  1 ──── N  Vivienda
    │
    └──── 1 ──── N  ClienteInteresado
```

- **`proyectos`** — desarrollo inmobiliario (nombre, ciudad, dirección, precio
  desde, estado de obra, destacado).
- **`viviendas`** — inmueble concreto dentro de un proyecto (tipo, habitaciones,
  baños, área, precio, disponibilidad). FK `proyecto_id`.
- **`clientes_interesados`** — solicitud enviada desde el sitio público
  (nombre, teléfono, correo, mensaje, fecha). FK `proyecto_id`.

Ambas relaciones usan `ON DELETE CASCADE`: al borrar un proyecto se borran sus
viviendas y sus solicitudes asociadas.

**Enumeraciones** (persistidas como texto con `@Enumerated(EnumType.STRING)`):

- `EstadoProyecto`: `EN_PLANOS`, `EN_CONSTRUCCION`, `ENTREGA_INMEDIATA`
- `TipoVivienda`: `CASA`, `APARTAMENTO`, `LOTE`

---

## 3. Estructura del backend

El backend sigue una arquitectura por capas. Cada petición recorre este camino:

```
Controller  →  Service (interfaz)  →  ServiceImpl  →  Repository  →  MySQL
     ↑                                      │
     └────────── DTO ◄──── Mapper ◄─────── Entity
```

| Paquete | Responsabilidad |
|---|---|
| `controller/` | Expone los endpoints REST y recibe/devuelve DTOs |
| `service/` | Interfaces que definen el contrato de la lógica de negocio |
| `service/impl/` | Implementación de esa lógica (validaciones, reglas) |
| `repository/` | Interfaces `JpaRepository`: Spring genera el SQL automáticamente |
| `entity/` | Clases mapeadas a las tablas con anotaciones JPA |
| `dto/` | Objetos de entrada (`RequestDTO`) y salida (`ResponseDTO`) |
| `mapper/` | Convierte entre entidades y DTOs |
| `enums/` | Enumeraciones del dominio |
| `exception/` | Excepciones propias y manejador global de errores |
| `config/` | Configuración de CORS y carga inicial de datos |

**¿Por qué DTOs y no las entidades directamente?** Para no exponer el modelo
interno de la base de datos en la API, y para evitar bucles infinitos al
serializar relaciones bidireccionales (Proyecto → Viviendas → Proyecto → ...).

---

## 4. Endpoints de la API

Base: `http://localhost:8080`

### Proyectos
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/proyectos` | Lista todos los proyectos |
| GET | `/proyectos/destacados` | Solo los marcados como destacados |
| GET | `/proyectos/{id}` | Un proyecto por su id |
| POST | `/proyectos` | Crea un proyecto |
| PUT | `/proyectos/{id}` | Actualiza un proyecto |
| DELETE | `/proyectos/{id}` | Elimina un proyecto (y lo que depende de él) |

### Viviendas
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/viviendas` | Lista todas las viviendas |
| GET | `/viviendas/disponibles` | Solo las disponibles |
| GET | `/viviendas/proyecto/{proyectoId}` | Viviendas de un proyecto |
| GET | `/viviendas/{id}` | Una vivienda por su id |
| POST | `/viviendas` | Crea una vivienda |
| PUT | `/viviendas/{id}` | Actualiza una vivienda |
| DELETE | `/viviendas/{id}` | Elimina una vivienda |

### Clientes interesados
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/clientes-interesados` | Lista todas las solicitudes |
| GET | `/clientes-interesados/proyecto/{proyectoId}` | Solicitudes de un proyecto |
| GET | `/clientes-interesados/{id}` | Una solicitud por su id |
| POST | `/clientes-interesados` | Registra una solicitud (lo usa el formulario público) |
| DELETE | `/clientes-interesados/{id}` | Elimina una solicitud |

---

## 5. Pantallas del frontend

**Sitio público**
- `/` — Inicio: portada, estadísticas y proyectos destacados
- `/proyectos` — Catálogo completo con filtros
- `/viviendas` — Inmuebles disponibles
- `/detalle-proyecto/:id` — Ficha del proyecto + formulario de interés
- `/contacto` — Formulario de contacto con selector de proyecto

**Administración**
- `/admin-proyectos` — Tabla de proyectos
- `/admin-viviendas` — Tabla de viviendas con resumen del inventario
- `/admin-clientes` — Solicitudes recibidas, con opción de eliminar

---

## 6. Cómo ejecutar el proyecto

### Requisitos
- MySQL 8 o superior
- Java 17 o superior
- Node.js 18 o superior

No hace falta instalar Maven: el proyecto incluye el *Maven Wrapper*
(`mvnw`), que descarga la versión correcta la primera vez que se ejecuta.

### Paso 1 — Arrancar MySQL

```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

### Paso 2 — Crear la base de datos

Ejecutar los scripts en orden, desde la terminal:

```bash
cd 1_base_de_datos
mysql --default-character-set=utf8mb4 -u root -p < 01_app_constructora_schema.sql
mysql --default-character-set=utf8mb4 -u root -p < 02_app_constructora_datos.sql
mysql --default-character-set=utf8mb4 -u root -p --table < 03_consultas_verificacion.sql
```

> `--default-character-set=utf8mb4` es necesario: si el cliente de MySQL
> está configurado en `latin1`, las tildes se guardan mal y en la
> aplicación aparecería "BogotÃ¡" en vez de "Bogotá".

Como alternativa, `04_constructora_db_export.sql` restaura la base completa
—estructura y datos— de una sola vez:

```bash
mysql --default-character-set=utf8mb4 -u root -p < 1_base_de_datos/04_constructora_db_export.sql
```

Después hay que crear el usuario que usa el backend y registrar su clave en
`2_backend/local.properties` (ese archivo no se versiona):

```sql
CREATE USER 'constructora_app'@'localhost' IDENTIFIED BY 'la_clave_que_elijas';
GRANT ALL PRIVILEGES ON constructora_db.* TO 'constructora_app'@'localhost';
FLUSH PRIVILEGES;
```

```properties
# 2_backend/local.properties
DB_USER=constructora_app
DB_PASSWORD=la_clave_que_elijas
```

### Paso 3 — Arrancar el backend

```bash
cd 2_backend
./mvnw spring-boot:run
```

Esperar a que aparezca `Started ConstructoraApplication`.

Queda escuchando en `http://localhost:8080`. Para comprobarlo:

```bash
curl http://localhost:8080/proyectos
```

### Paso 4 — Arrancar el frontend

En **otra** ventana de terminal (el backend debe seguir corriendo):

```bash
cd 3_frontend
npm install
npm run dev
```

Abrir `http://localhost:5173`.

Para la versión rediseñada, lo mismo en `4_frontend_modificado` pero en otro
puerto:

```bash
cd 4_frontend_modificado
npm install
npm run dev -- --port 5174
```

Las dos pueden correr al mismo tiempo: `CorsConfig` autoriza los puertos 5173
y 5174, así que se pueden comparar lado a lado.

---

## 7. Decisiones técnicas

- **`BigDecimal` para precios**, no `double`: evita los errores de redondeo de
  la aritmética de punto flotante en valores monetarios.
- **`LocalDate` / `LocalDateTime`** en lugar de `java.util.Date`: API de fechas
  inmutable y sin zonas horarias implícitas.
- **`ddl-auto=validate`**: Hibernate verifica que las entidades coincidan con
  las tablas creadas por el script SQL, pero nunca modifica el esquema. Así la
  base de datos es la fuente de verdad y no se altera sola.
- **Usuario de base de datos dedicado** (`constructora_app`) con permisos solo
  sobre `constructora_db`, en vez de usar `root`. Su clave se genera al azar y
  vive en `local.properties`, fuera del control de versiones.
- **Enums como `VARCHAR`**: `@JdbcTypeCode(SqlTypes.VARCHAR)` en `Proyecto.estado`
  y `Vivienda.tipo`. Hibernate 6 usaría por defecto el tipo `ENUM` nativo de
  MySQL, que es rígido: agregar una constante al enum obliga a un `ALTER TABLE`.
- **`characterEncoding=UTF-8`** en la URL de JDBC, para que las tildes viajen
  correctamente entre la aplicación y la base de datos.
- **CORS configurado** en `config/CorsConfig.java` para permitir las peticiones
  desde `http://localhost:5173` y `http://localhost:5174`, los puertos de las
  dos versiones del frontend.
- **Colecciones genéricas** `List<Vivienda>` y `List<ClienteInteresado>`
  inicializadas con `ArrayList<>` para que nunca queden en `null`.
- **Lombok** (`@Getter`, `@Setter`, `@RequiredArgsConstructor`) para eliminar
  código repetitivo en entidades y DTOs. Se fija la versión **1.18.42** en
  lugar de la 1.18.30 que gestiona Spring Boot 3.2.0: la antigua no reconoce
  los JDK más recientes y falla al arrancar como procesador de anotaciones.
  Además se declara explícitamente en `annotationProcessorPaths`, porque las
  versiones nuevas de `javac` dejarán de habilitar procesadores encontrados
  sueltos en el classpath.
- **Maven Wrapper** (`mvnw`) versionado con el proyecto: se compila y ejecuta
  sin depender de que Maven esté instalado en la máquina.

---

## 8. Diferencias entre `3_frontend` y `4_frontend_modificado`

Las dos versiones consumen exactamente la misma API: **los cambios están todos
en la capa de presentación**. El backend y la base de datos no se tocaron.

### Lenguaje visual

La versión modificada sigue un lenguaje **editorial arquitectónico**, inspirado
en las revistas del gremio: la jerarquía tipográfica manda sobre la imagen, la
separación se resuelve con líneas finas y el color se usa con cuenta.

| | Versión original | Versión modificada |
|---|---|---|
| Fondo | Gris claro (`slate-50`) | Beige con base verdosa (`#EAECE3`), del tono del yeso de cal |
| Texto | Gris azulado | Casi negro con la misma base verdosa del fondo |
| Acento | Morado índigo, usado en todo | Terracota, usado con cuenta |
| Tipografía | La del sistema | Archivo (grotesca) + IBM Plex Mono para números y metadatos |
| Escala | Tamaños cercanos entre sí | Mucho contraste: títulos enormes contra rótulos diminutos |
| Separación | Tarjetas con sombra y bordes redondeados | Líneas de 1 px. Sin sombras, sin esquinas redondeadas |
| Retícula | Tres columnas iguales | Asimétrica: un proyecto grande y el resto pequeños |
| Portafolio | Cuadrícula de tarjetas | Índice numerado en filas, se lee como un sumario |
| Formularios | Campos con caja completa | Subrayado que se tiñe al enfocarse |
| Portada | Bloque de color plano | Fotografía en grises, fundida al papel con mezcla `multiply` al 22 % |

### Sistema de diseño

La paleta y las tipografías se declaran en `tailwind.config.js`, no sueltas por
los archivos. Los nombres describen la **función**, no la apariencia:

| Token | Para qué |
|---|---|
| `papel-50` … `papel-400` | Fondos, de más claro a más oscuro |
| `tinta-400` … `tinta-900` | Textos, de más tenue a más fuerte |
| `terracota-300` … `terracota-500` | El único acento |

Cambiar la identidad visual completa es cambiar esos valores en un solo
archivo.

### Elementos nuevos

Funcionalidad de interfaz que no existe en la versión original:

- **Banda de datos** en el inicio y en administración, calculada en vivo a
  partir de lo que devuelve la API (proyectos, viviendas, ciudades).
- **Filtros** en Proyectos: por ciudad, por estado de obra y ordenamiento por
  precio, con contador de resultados.
- **Pestañas por tipo de vivienda**, cada una con su número de inmuebles.
- **Menú de gestión desplegable** en la barra de navegación.
- **Migas de pan** en el detalle del proyecto.
- **Listado de las viviendas del proyecto** dentro de su propia ficha, que usa
  el endpoint `/viviendas/proyecto/{id}` que la versión original no consumía.
- **Esqueletos de carga** con la forma del contenido que va a llegar, en vez de
  un texto de "Cargando...".
- **Resumen del inventario** en administración: total, disponibles, reservadas
  y valor acumulado.
- **Secciones numeradas** (`01`, `02`, `03`) como recurso de orden.
- **Formato local**: pesos colombianos con `Intl.NumberFormat` y traducción de
  los enums a texto legible (`EN_CONSTRUCCION` → "En construcción").

### Componentes

La biblioteca de `ui.jsx` se reescribió por completo: `Seccion` (encabezado
numerado), `Meta` (metadato), `Dato` (cifra grande), `Esqueleto`, `Aviso`,
`Button`, `Input`, `Textarea` y `Select`, más las utilidades `precioCOP`,
`legible` y `dosDigitos`.

### Rendimiento

La fotografía de portada se optimizó de **37 MB** (6720 × 4480) a **368 KB**
(2000 × 1600). A la opacidad con la que se usa, la diferencia no es perceptible.
