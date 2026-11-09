# Guion de los dos videos

Grabar con QuickTime: **Archivo → Nueva grabación de pantalla**. Elegir
micrófono antes de empezar. Grabar la pantalla completa.

**Antes de grabar cualquiera de los dos videos, dejar listo:**

1. MySQL corriendo.
2. Backend corriendo (`cd 2_backend && mvn spring-boot:run`). Esperar a que
   aparezca `Started ConstructoraApplication`.
3. Frontend corriendo en otra terminal (`npm run dev`).
4. El navegador abierto en `http://localhost:5173`, sin pestañas personales.
5. Cerrar WhatsApp, correo y notificaciones.

---

# VIDEO 1 — Funcionamiento de la aplicación

**Duración objetivo: 8 a 10 minutos.**

---

## Parte 1 — Presentación (30 segundos)

> "Buenas, soy Marianie Vásquez, de Construcción de Software. Voy a presentar
> AppConstructora, una aplicación web de gestión gerencial para una
> constructora. Permite administrar proyectos inmobiliarios, las viviendas de
> cada proyecto y los clientes que registran interés desde el sitio público."

> "La aplicación tiene tres capas: una base de datos en MySQL, un backend en
> Java con Spring Boot que expone una API REST, y un frontend en React que
> consume esa API."

---

## Parte 2 — La base de datos (2 minutos)

Abrir MySQL Workbench, o la Terminal con el script de verificación.

**Mostrar el esquema** (`01_app_constructora_schema.sql`):

> "La base de datos se llama `constructora_db` y tiene tres tablas."

> "`proyectos` guarda cada desarrollo inmobiliario: nombre, descripción,
> ciudad, dirección, precio desde, estado de obra y si está destacado."

> "`viviendas` guarda cada inmueble concreto: título, tipo, habitaciones,
> baños, área, precio y si está disponible. Tiene una llave foránea
> `proyecto_id` que la relaciona con su proyecto."

> "`clientes_interesados` guarda las solicitudes que llegan del formulario
> público: nombre, teléfono, correo, mensaje y fecha de registro. También
> tiene llave foránea hacia el proyecto por el que preguntaron."

**Señalar las relaciones:**

> "Las dos relaciones son de uno a muchos: un proyecto tiene muchas viviendas y
> muchos clientes interesados. Las dos llaves foráneas están declaradas con
> `ON DELETE CASCADE`, así que si se borra un proyecto, se borran también sus
> viviendas y sus solicitudes. Eso evita quedar con registros huérfanos."

**Ejecutar las consultas de verificación** (`03_consultas_verificacion.sql`):

> "Estas son las consultas de verificación. La primera lista los proyectos. La
> segunda, solo los destacados. La tercera cruza viviendas con proyectos usando
> un JOIN para ver qué inmuebles están disponibles y a qué proyecto pertenecen.
> Y la última muestra los clientes interesados junto al proyecto por el que
> preguntaron."

---

## Parte 3 — El backend (3 minutos)

Abrir el proyecto en el editor y recorrer `2_backend/src/main/java/com/constructora/`.

**La arquitectura por capas:**

> "El backend está organizado por capas. Una petición entra por el controller,
> pasa al service, que llama al repository, y el repository es el que habla con
> la base de datos. De vuelta, la entidad se convierte en DTO con un mapper
> antes de salir como JSON."

**`entity/Proyecto.java`:**

> "Esta es la entidad Proyecto. La anotación `@Entity` le dice a JPA que esta
> clase representa una tabla, y `@Table(name = "proyectos")` indica cuál."

> "El id lleva `@Id` y `@GeneratedValue` con estrategia `IDENTITY`, que es el
> `AUTO_INCREMENT` de MySQL."

> "El estado es un enum y lleva `@Enumerated(EnumType.STRING)`. Eso hace que en
> la base de datos se guarde el texto `EN_CONSTRUCCION` en vez de un número.
> Así la tabla es legible y, si después reordeno las constantes del enum, los
> datos no se corrompen."

> "El precio es `BigDecimal`, no `double`. En valores de dinero `double` produce
> errores de redondeo, y en precios de vivienda eso es inaceptable."

> "Y aquí está la relación: `@OneToMany(mappedBy = "proyecto")` con la lista de
> viviendas, inicializada con `ArrayList` para que nunca quede en `null`."

**`entity/Vivienda.java`:**

> "Del otro lado de la relación, Vivienda tiene `@ManyToOne` con
> `@JoinColumn(name = "proyecto_id")`, que es la columna de la llave foránea.
> Usa `FetchType.LAZY` para que al traer una vivienda no se cargue
> automáticamente todo el proyecto completo si no lo necesito."

**`repository/ProyectoRepository.java`:**

> "Los repositorios son solo interfaces que extienden `JpaRepository`. No
> escribo nada de SQL: Spring Data genera la implementación en tiempo de
> ejecución. Por ejemplo, `findByDestacadoTrue` se traduce solo a un
> `WHERE destacado = true`, derivado del nombre del método."

**`service/` y `service/impl/`:**

> "La lógica de negocio está separada en una interfaz y su implementación. La
> interfaz define el contrato y la implementación hace el trabajo: busca,
> valida que exista, y si no existe lanza una excepción propia."

**`dto/` y `mapper/`:**

> "No devuelvo las entidades directamente. Uso DTOs por dos razones: no exponer
> el modelo interno de la base de datos en la API, y evitar bucles infinitos al
> convertir a JSON, porque Proyecto apunta a Vivienda y Vivienda apunta de
> vuelta a Proyecto."

> "Los `RequestDTO` llevan validaciones con anotaciones: `@NotBlank` para los
> campos obligatorios, `@Email` para el correo, `@NotNull` para el id del
> proyecto."

**`controller/ProyectoController.java`:**

> "El controller expone los endpoints. `@RestController` con
> `@RequestMapping("/proyectos")` define la ruta base, y cada método tiene su
> verbo HTTP: GET para consultar, POST para crear, PUT para actualizar y DELETE
> para eliminar."

**`exception/GlobalExceptionHandler.java`:**

> "Este manejador global captura las excepciones y las convierte en respuestas
> HTTP con el código correcto: 404 si no se encuentra el recurso, 400 si los
> datos no pasan la validación. Así el frontend recibe un mensaje claro en vez
> de un error genérico del servidor."

**`config/CorsConfig.java`:**

> "Y esta configuración de CORS es necesaria porque el frontend corre en el
> puerto 5173 y el backend en el 8080. Son orígenes distintos, y sin esto el
> navegador bloquearía las peticiones."

**Mostrar la API funcionando:**

Abrir en el navegador `http://localhost:8080/proyectos`.

> "Aquí está la API respondiendo. Este JSON es exactamente lo que consume el
> frontend."

Probar también `http://localhost:8080/proyectos/destacados` y
`http://localhost:8080/viviendas/disponibles`.

---

## Parte 4 — El frontend (3 minutos)

Ir a `http://localhost:5173`.

**Inicio:**

> "Esta es la página de inicio. Los proyectos destacados que se ven acá no están
> escritos en el código: salen de la petición al endpoint
> `/proyectos/destacados`. Si cambio el campo `destacado` en la base de datos,
> esta sección cambia."

**Proyectos:**

> "En Proyectos se listan todos, consumiendo el endpoint `/proyectos`."

**Detalle del proyecto:**

Hacer clic en "Ver detalle".

> "Al entrar al detalle, la ruta lleva el id del proyecto. El componente lee ese
> id de la URL con `useParams` y hace la petición a `/proyectos/` más el id."

**Viviendas:**

> "Viviendas consume `/viviendas/disponibles`, así que solo muestra las que
> están libres. Cada tarjeta indica a qué proyecto pertenece, que es el dato que
> viene de la relación entre las dos tablas."

**El formulario (la parte importante — demostrar el flujo completo):**

Ir a Contacto.

> "Ahora voy a mostrar el flujo completo, de principio a fin. Voy a llenar este
> formulario de interés."

Llenar: proyecto, nombre, teléfono, correo, mensaje. Enviar.

> "Al enviar, el frontend hace un POST a `/clientes-interesados`. El controller
> lo recibe, valida los datos con las anotaciones del DTO, el service lo guarda
> con el repositorio y JPA ejecuta el INSERT en MySQL."

**Verificar que se guardó, en dos lugares:**

Ir a `/admin-clientes`.

> "Y acá está el registro que acabo de crear, traído de vuelta desde la base de
> datos."

Ir a MySQL y correr `SELECT * FROM clientes_interesados;`.

> "Y en la base de datos también está. El dato recorrió las tres capas:
> formulario, API y base de datos."

**Mostrar el DELETE:**

Volver a `/admin-clientes`, eliminar un registro.

> "Esta tabla también permite eliminar. Pide confirmación antes de borrar, hace
> un DELETE al endpoint y vuelve a cargar la lista."

---

## Parte 5 — Cierre (30 segundos)

> "En resumen: una base de datos relacional en MySQL con tres tablas
> relacionadas, un backend en Spring Boot organizado por capas que expone una
> API REST, y un frontend en React que la consume. Los datos fluyen en las dos
> direcciones y las tres capas quedan verificadas. Gracias."

---
---

# VIDEO 2 — Aplicación modificada: estilos y elementos

**Duración objetivo: 5 a 7 minutos.**

**Preparación:** detener el frontend original y arrancar el modificado:

```bash
cd 4_frontend_modificado
npm install
npm run dev
```

> **Truco para que el contraste se vea:** antes de grabar, toma capturas de
> pantalla de la versión original (inicio, proyectos, viviendas, contacto y una
> tabla de administración). Ábrelas en Vista Previa en otra ventana para
> mostrarlas lado a lado durante el video.

---

## Parte 1 — Presentación (30 segundos)

> "En este segundo video voy a mostrar la aplicación con las modificaciones que
> le hice: cambié por completo el sistema de diseño y agregué elementos de
> interfaz nuevos. El backend y la base de datos son los mismos: los cambios
> están todos en la capa de presentación."

---

## Parte 2 — El antes y el después (1 minuto)

Mostrar la captura de la versión original y luego la app modificada.

> "Esta era la versión original: tema claro, gris con morado índigo, tipografía
> del sistema, tarjetas redondeadas con sombra."

> "Y esta es la versión modificada: un tema oscuro con acentos dorados,
> tipografía serif para los títulos, bordes rectos de estilo editorial y
> tarjetas que se iluminan y se elevan al pasar el cursor."

---

## Parte 3 — Cómo se hizo el cambio de estilos (2 minutos)

Abrir `4_frontend_modificado/tailwind.config.js`.

> "El cambio no fue retocar colores sueltos en cada archivo. Definí un sistema
> de diseño en la configuración de Tailwind."

> "Creé dos paletas propias: `carbon`, con los tonos de fondo y de texto, y
> `oro`, con los acentos dorados. Ahora en el código escribo `bg-carbon-900` o
> `text-oro-300`, y si quisiera cambiar toda la identidad visual de la
> aplicación bastaría con cambiar estos valores en un solo archivo."

> "También registré dos tipografías: Cormorant Garamond para los títulos y Jost
> para el texto, cargadas desde Google Fonts."

Abrir `src/index.css`.

> "Acá está la capa base: el fondo del `body` no es un color plano, son dos
> degradados radiales dorados muy tenues en las esquinas superiores, para darle
> profundidad."

> "Y en la capa de componentes definí dos clases que reutilizo en todas las
> páginas: `regla-oro`, que es la línea dorada que separa secciones, y
> `eyebrow`, que es la etiqueta pequeña en mayúsculas con el espaciado amplio."

> "Hasta la barra de desplazamiento está al tono del tema."

---

## Parte 4 — Los componentes rediseñados (1 minuto)

Abrir `src/ui.jsx`.

> "Esta es la biblioteca de componentes. Los botones pasaron de redondeados con
> sombra a rectos, en mayúsculas y con el texto espaciado, y el principal
> dorado se ilumina al pasar el cursor."

> "Los campos del formulario cambiaron de concepto: antes eran cajas con borde
> completo, ahora son solo un subrayado fino que se tiñe de dorado cuando el
> campo recibe el foco."

Mostrarlo en vivo: ir a Contacto y hacer clic en los campos.

---

## Parte 5 — Los elementos nuevos (2 minutos)

**Aquí está lo que más pesa en la calificación: mostrar cada elemento funcionando.**

**En Inicio:**

> "Agregué una banda de estadísticas. Estos números no están escritos a mano:
> se calculan contando los proyectos, las viviendas disponibles y las ciudades
> distintas que devuelve el backend."

> "También agregué una portada con imagen de fondo y degradado encima, que
> antes era solo un bloque de color."

**En Proyectos:**

> "Agregué una barra de filtros. Puedo filtrar por ciudad..."

Usar el filtro de ciudad.

> "...por estado de obra..."

Usar el filtro de estado.

> "...y ordenar por precio, de menor a mayor o al contrario."

Usar el ordenamiento. Señalar el contador.

> "Y este contador muestra cuántos proyectos quedan visibles de cuántos hay en
> total. Todo el filtrado se hace en el cliente, sin volver a pedir datos al
> servidor."

**En Viviendas:**

> "Acá agregué pestañas por tipo de vivienda, y cada una muestra cuántos
> inmuebles tiene."

Cambiar entre Casa, Apartamento y Lote.

> "Y la ficha técnica de cada inmueble, que antes era una línea de emojis, ahora
> es una rejilla de tres columnas con habitaciones, baños y metros cuadrados."

**En el detalle del proyecto:**

> "Agregué migas de pan para ubicarse en la navegación."

> "Y agregué el listado de las viviendas de ese proyecto dentro de su propia
> ficha. Eso implicó una segunda petición al endpoint
> `/viviendas/proyecto/` más el id, que ya existía en el backend pero el
> frontend original no usaba."

**Los placeholders de carga:**

Recargar la página con F5 y señalar.

> "Mientras llegan los datos del backend ya no aparece un texto de 'Cargando':
> se muestran estos bloques animados que tienen la forma del contenido que va a
> llegar. Es el patrón de *skeleton*."

**En administración:**

> "El menú de administración ahora es un desplegable en la barra de navegación,
> en vez de un enlace suelto."

Abrir el menú.

> "Y en la tabla de viviendas agregué un resumen del inventario: total de
> inmuebles, disponibles, reservadas y el valor total, que se calcula sumando
> los precios de todas las viviendas."

**Los formatos:**

> "Dos detalles más. Los precios ahora se formatean como moneda colombiana con
> `Intl.NumberFormat`. Y los enums se traducen a texto legible: en la base de
> datos el valor es `EN_CONSTRUCCION`, en mayúsculas y con guion bajo, y en
> pantalla se lee 'En construcción'."

---

## Parte 6 — Verificar que sigue funcionando (1 minuto)

**Importante: demostrar que el rediseño no rompió la funcionalidad.**

Ir a Contacto, llenar el formulario y enviarlo. Luego ir a `/admin-clientes`.

> "Y lo más importante: a pesar de todos los cambios visuales, la aplicación
> sigue funcionando igual. Acabo de enviar una solicitud desde el formulario
> rediseñado y acá está guardada. Los cambios fueron solo en la capa de
> presentación: el backend y la base de datos no se tocaron."

---

## Parte 7 — Cierre (30 segundos)

> "En resumen, las modificaciones fueron: un sistema de diseño propio con dos
> paletas y dos tipografías definidas en la configuración de Tailwind, todos los
> componentes base rediseñados, y elementos de interfaz nuevos: banda de
> estadísticas, filtros, ordenamiento, pestañas por tipo, migas de pan, menú
> desplegable, placeholders de carga, resumen de inventario y formato de moneda
> local. Gracias."
