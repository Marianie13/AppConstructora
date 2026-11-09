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
| `1_base_de_datos/` | Scripts SQL: esquema, datos de prueba y consultas de verificación |
| `2_backend/` | API REST en Spring Boot 3.2 + Java 17 + JPA/Hibernate |
| `3_frontend/` | Interfaz web original (React 18 + Vite + Tailwind CSS) |
| `4_frontend_modificado/` | La misma interfaz con el rediseño propio (tema oscuro "Habita") |
| `instalar_base_de_datos.sh` | Script que crea la base de datos de un solo paso |

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
- Maven

### Paso 1 — Arrancar MySQL

```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

### Paso 2 — Crear la base de datos

```bash
bash instalar_base_de_datos.sh
```

El script pide la clave de root de MySQL, crea la base `constructora_db`, las
tablas, los datos de prueba, el usuario `constructora_app` que usa el backend y
muestra las consultas de verificación.

La clave de ese usuario se genera al azar en cada instalación y queda guardada
únicamente en `2_backend/local.properties`, un archivo excluido del repositorio
por `.gitignore`. El backend lo lee al arrancar. Por eso **no hay ninguna
contraseña escrita en el código**.

Si MySQL nunca ha funcionado en el equipo o se perdió la clave de root, usar en
su lugar:

```bash
sudo bash reparar_mysql.sh
```

Ese script restablece la clave de root y deja la base instalada en una sola
pasada.

> Alternativa manual (MySQL Workbench): ejecutar en orden
> `01_app_constructora_schema.sql`, `02_app_constructora_datos.sql` y
> `03_consultas_verificacion.sql`, y ajustar usuario y clave en
> `2_backend/src/main/resources/application.properties`.

### Paso 3 — Arrancar el backend

```bash
cd 2_backend
mvn spring-boot:run
```

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

Para ver la versión rediseñada, usar `4_frontend_modificado` en lugar de
`3_frontend` (detener primero el otro frontend, porque ambos usan el puerto 5173).

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
  desde `http://localhost:5173`, el puerto del frontend.
- **Colecciones genéricas** `List<Vivienda>` y `List<ClienteInteresado>`
  inicializadas con `ArrayList<>` para que nunca queden en `null`.
- **Lombok** (`@Getter`, `@Setter`, `@RequiredArgsConstructor`) para eliminar
  código repetitivo en entidades y DTOs.

---

## 8. Diferencias entre `3_frontend` y `4_frontend_modificado`

### Estilos
| | Versión original | Versión modificada |
|---|---|---|
| Tema | Claro (gris y morado índigo) | Oscuro (carbón con acentos dorados) |
| Tipografía | Tipografía del sistema | Cormorant Garamond (títulos) + Jost (texto) |
| Bordes | Redondeados (`rounded-xl`) | Rectos, estilo editorial |
| Tarjetas | Sombra suave | Borde fino que se ilumina y elevación al pasar el cursor |
| Formularios | Campos con caja y borde completo | Campos con subrayado que se tiñe al enfocarse |
| Paleta | Clases por defecto de Tailwind | Paleta propia `carbon` y `oro` definida en `tailwind.config.js` |

### Elementos nuevos
- Banda de estadísticas calculadas en vivo en el inicio y en administración.
- Barra de filtros en Proyectos: por ciudad, por estado de obra y ordenamiento
  por precio.
- Pestañas por tipo de vivienda, con el contador de inmuebles de cada tipo.
- Menú de administración plegable en la barra de navegación.
- Migas de pan en el detalle del proyecto.
- Listado de las viviendas del proyecto dentro de su propia ficha.
- Placeholders animados (*skeletons*) mientras llegan los datos del backend.
- Componentes nuevos: `TituloSeccion`, `Etiqueta`, `Estadistica`, `Esqueleto`,
  `Aviso`, `Textarea`, `Select`.
- Formato de moneda colombiana con `Intl.NumberFormat` y traducción de los
  enums a texto legible (`EN_CONSTRUCCION` → "En construcción").
- Pie de página de tres columnas con datos de contacto.
- Panel de datos de contacto en la página de Contacto.
