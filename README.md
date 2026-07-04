# NutriStock - Gestión de Stock de Frutos Secos

## 1. Nombre del Proyecto
**NutriStock** — Sistema de Gestión de Inventario y Alertas de Abastecimiento para Tiendas de Frutos Secos.

---

## 2. Cliente y Problemática

### Cliente
**NutriGranel SpA** — Empresa ficticia que opera una cadena de tiendas especializadas en la venta a granel de frutos secos, semillas y frutas deshidratadas en la Región Metropolitana de Chile.

### Contexto del Cliente
NutriGranel cuenta con 3 puntos de venta (La Florida, Providencia y Maipú). Cada sucursal maneja entre 25 y 50 productos a granel que se adquieren a distintos proveedores mayoristas nacionales e importados. Actualmente, el control de stock se lleva de forma manual en planillas Excel, lo que genera errores frecuentes, pérdidas por vencimiento de productos y quiebres de stock inesperados.

### Necesidad o Problemática Detectada
- **Quiebres de stock recurrentes**: Los encargados no detectan a tiempo cuándo un producto está por agotarse, generando pérdida de ventas.
- **Falta de trazabilidad**: No existe un registro claro de cuándo se recibió mercadería de proveedores ni cuánto se vendió.
- **Desorganización del inventario**: Los datos de precios de compra y venta no están centralizados, dificultando el cálculo de márgenes de ganancia.
- **Reacción tardía ante vencimientos**: Sin alertas proactivas, los productos perecibles se deterioran antes de ser vendidos.

### Objetivo de la Solución Propuesta
Desarrollar una aplicación web SPA (Single Page Application) que permita a los administradores de tienda:
- Registrar y consultar productos con sus precios de compra y venta.
- Configurar niveles mínimos de stock por producto.
- Recibir **alertas visuales de abastecimiento** cuando el stock cae bajo el mínimo.
- Registrar entradas (compras a proveedor) y salidas (ventas, mermas) de stock.
- Visualizar un historial completo de movimientos para trazabilidad.
- Tomar decisiones de compra basadas en datos reales y no en estimaciones.

---

## 3. Descripción de la Solución

**NutriStock** es una aplicación web responsiva construida con **React + Vite** que resuelve la problemática descrita mediante:

1. **Panel de Control (Dashboard)**: Vista resumen con métricas clave (total de productos, alertas activas, valorización de inventario a costo y a precio venta).
2. **Sistema de Alertas de Abastecimiento**: Sección destacada que muestra en tiempo real los productos cuyo stock ha alcanzado o descendido del mínimo configurado, con barras de progreso y botón de acción rápida para reabastecer.
3. **Catálogo de Inventario**: Vista dual (tarjetas y tabla) con filtros avanzados por nombre, categoría y nivel de stock. Permite operaciones CRUD completas sobre productos.
4. **Historial de Movimientos**: Registro trazable de todas las entradas y salidas de stock con fecha, motivo e ID de transacción.
5. **Persistencia con LocalStorage**: Los datos se guardan automáticamente en el navegador, permitiendo continuidad entre sesiones.

---

## 4. Funcionalidades Propuestas

### Funcionalidades Implementadas (Evaluación 3)
| Funcionalidad | Estado | Descripción |
|---|---|---|
| Crear productos | ✅ Implementado | Formulario modal con validaciones para registrar nuevos productos |
| Consultar productos | ✅ Implementado | Vista grid y tabla con filtros por nombre, categoría y stock |
| Modificar productos | ✅ Implementado | Edición de datos con registro automático de ajuste de inventario |
| Eliminar productos | ✅ Implementado | Eliminación con confirmación, manteniendo historial de movimientos |
| Registrar entradas de stock | ✅ Implementado | Modal con selección de producto, cantidad y motivo |
| Registrar salidas de stock | ✅ Implementado | Validación de stock disponible antes de permitir la salida |
| Alertas de abastecimiento | ✅ Implementado | Detección automática de productos bajo stock mínimo |
| Dashboard con métricas | ✅ Implementado | 4 KPIs clave y últimos 5 movimientos |
| Persistencia con LocalStorage | ✅ Implementado | Sincronización automática de productos y movimientos |

### Funcionalidades Futuras (Evaluaciones 4 y Final)
| Funcionalidad | Estado | Descripción |
|---|---|---|
| Integración con API externa | 🔜 Planificado | Consulta de precios de mercado mayorista vía API |
| Validaciones avanzadas de formularios | 🔜 Planificado | Validación de campos con mensajes de error específicos |
| Manejo de errores HTTP | 🔜 Planificado | Gestión de estados de carga, error y reintentos |
| Exportar reportes | 🔜 Planificado | Generación de reportes de stock en PDF o CSV |
| Sistema de usuarios | 🔜 Planificado | Login y roles para cada sucursal |

---

## 5. Estructura del Proyecto

```text
fronenteva3/
├── .git/                          # Repositorio Git local (ramas main, develop, feature/*)
├── node_modules/                  # Dependencias instaladas vía npm
├── public/                        # Archivos estáticos públicos
│   ├── favicon.svg                # Icono del sitio
│   └── icons.svg                  # Set de iconos vectoriales SVG
├── src/                           # Directorio principal del código fuente
│   ├── assets/                    # Recursos de imágenes y multimedia
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/                # Componentes React reutilizables (modular)
│   │   ├── Header.jsx             # Encabezado con logo y datos del usuario
│   │   ├── Navigation.jsx         # Barra de navegación con pestañas dinámicas
│   │   ├── Dashboard.jsx          # Panel general (compuesto por MetricCard + AlertItem)
│   │   ├── MetricCard.jsx         # Tarjeta de métrica KPI reutilizable
│   │   ├── AlertItem.jsx          # Item individual de alerta de stock crítico
│   │   ├── InventoryTab.jsx       # Pestaña de inventario (compuesto por ProductCard + ProductTable)
│   │   ├── ProductCard.jsx        # Tarjeta de producto para vista grid
│   │   ├── ProductTable.jsx       # Tabla de productos para vista tabular
│   │   ├── MovementsTab.jsx       # Pestaña de historial de movimientos
│   │   ├── ProductModal.jsx       # Modal para crear/editar productos
│   │   ├── MovementModal.jsx      # Modal para registrar entrada/salida de stock
│   │   └── Footer.jsx             # Pie de página con info del proyecto
│   ├── App.css                    # Archivo auxiliar de estilos
│   ├── App.jsx                    # Componente principal (estado global, lógica y composición)
│   ├── index.css                  # Hoja de estilos CSS global (variables, layout, componentes)
│   └── main.jsx                   # Punto de entrada de renderizado en el DOM
├── .gitignore                     # Exclusiones de archivos en Git
├── .oxlintrc.json                 # Configuración del linter Oxlint
├── index.html                     # Plantilla HTML5 principal con SEO
├── package.json                   # Configuración de dependencias y scripts
├── package-lock.json              # Registro exacto de versiones
├── README.md                      # Documentación del proyecto (este archivo)
└── vite.config.js                 # Configuración del empaquetador Vite
```

### Separación de Responsabilidades
- **`App.jsx`**: Concentra toda la lógica de negocio, manejo de estado (`useState`, `useEffect`), persistencia (`localStorage`) y funciones handler.
- **`components/`**: Cada componente es un módulo independiente y reutilizable que recibe datos y callbacks vía **props**, siguiendo el patrón de comunicación unidireccional de React.
- **`index.css`**: Sistema de diseño global con variables CSS, flexbox, animaciones y media queries responsive.

---

## 6. Planificación de Integración Externa

### ¿Qué información se necesitará obtener?
Se planifica integrar una **API de precios de mercado mayorista** (como la API de [ODEPA](https://www.odepa.gob.cl/) o un servicio similar) para:
- Consultar precios de referencia actualizados de frutos secos y semillas en el mercado chileno.
- Comparar los precios de compra registrados en NutriStock con el precio promedio de mercado.
- Obtener datos de tendencia de precios para anticipar alzas de costos.

### ¿Por qué se requiere información externa?
- **Competitividad**: El administrador necesita saber si sus precios de compra son competitivos respecto al mercado.
- **Planificación de compras**: Conocer tendencias de precios permite comprar cuando el precio de mercado está bajo.
- **Actualización de precios de venta**: Ajustar precios de venta al público cuando el costo de mercado sube.

### ¿Cómo aportará valor a la solución?
- Se mostrará un **indicador comparativo** en cada tarjeta de producto mostrando si el precio de compra registrado está por encima o por debajo del promedio de mercado.
- Se implementará una sección de **"Recomendaciones de Compra"** que sugiera reabastecer productos cuyo precio de mercado esté en baja.
- Se consumirá la API mediante solicitudes HTTP (`fetch`) desde el frontend, y los datos se cachearán con `localStorage` para no sobrecargar las peticiones.

> **Nota**: En esta evaluación NO se implementa la conexión real a la API. La estructura del código (servicios, estados de carga, manejo de errores) está diseñada para incorporar esta funcionalidad en las evaluaciones siguientes sin necesidad de reestructurar la base del proyecto.

---

## 7. Evidencia del Uso de Inteligencia Artificial

### Lista de Prompts Utilizados Durante el Desarrollo

#### Prompt 1: Creación del proyecto base con Vite y React
* **Prompt:** *"Configurar un nuevo proyecto de React en limpio usando Vite en el directorio raíz en modo no interactivo."*
* **Recomendación IA:** La IA sugirió utilizar `npx create-vite@latest ./ --template react` para inicializar rápidamente con la plantilla de React.
* **Ajuste del estudiante:** Se verificó que la versión de Node.js fuera compatible (v18+) y se eligió la plantilla `react` (sin TypeScript) para mantener la simplicidad del proyecto educativo.

#### Prompt 2: Creación de la estructura de ramas Git
* **Prompt:** *"Inicializar un repositorio Git, crear la rama principal `main`, luego crear la rama de desarrollo `develop` y desde ahí crear la rama `feature/estructura` para comenzar a trabajar."*
* **Recomendación IA:** La IA recomendó seguir el flujo de Git Flow con merges `--no-ff` para preservar el historial de ramas.
* **Ajuste del estudiante:** Se adaptó el nombre de las ramas al estándar del curso y se realizaron commits frecuentes con mensajes descriptivos en español.

#### Prompt 3: Implementación de la estructura semántica HTML5 y estados React
* **Prompt:** *"En la rama `feature/estructura`, desarrollar en `App.jsx` una aplicación de gestión de inventario para una tienda de frutos secos que contenga un header con el logo del negocio, barra de navegación, panel general con métricas, alertas críticas de abastecimiento para stock inferior al mínimo, pestaña de inventario de stock en cuadrícula y tabla, historial de movimientos de entrada/salida de stock, formularios interactivos en ventana modal para registrar productos y movimientos, y un footer con datos de la evaluación. Usar tags semánticos como `header`, `nav`, `main`, `section` y `footer`."*
* **Recomendación IA:** La IA propuso centralizar el estado en `App.jsx` usando `useState` y `useEffect` con sincronización a `localStorage`, y utilizar datos por defecto para que la app no inicie vacía.
* **Ajuste del estudiante:** Se ajustaron los datos de ejemplo (nombres de productos, precios en pesos chilenos) para reflejar un caso de uso realista de una tienda chilena de frutos secos.

#### Prompt 4: Diseño estético y maquetación responsiva con CSS y Flexbox
* **Prompt:** *"En la rama `feature/estilos`, implementar en `index.css` un sistema de diseño premium, responsivo y adaptativo. Usar Flexbox para alinear los elementos de la navegación, tarjetas de métricas, alertas y productos. Crear una paleta de colores orgánicos y cálidos inspirados en frutos secos (almendra, castaño, pistacho, ámbar y tonos café de alta visibilidad). Incluir un diseño ordenado, tipografía moderna importada de Google Fonts y efectos de transición suave para los botones."*
* **Recomendación IA:** La IA sugirió utilizar variables CSS (`:root`) para centralizar los colores y tamaños, implementar dark mode con `prefers-color-scheme`, y usar la fuente Outfit de Google Fonts.
* **Ajuste del estudiante:** Se eligieron específicamente los tonos orgánicos (chestnut #c26d38, walnut #3c2f2f) y se ajustaron los breakpoints responsivos para coincidir con los dispositivos más comunes en Chile.

#### Prompt 5: Modularización en componentes React reutilizables
* **Prompt:** *"Refactorizar el App.jsx actual extrayendo los bloques de UI en componentes React independientes dentro de `src/components/`, manteniendo la lógica de estado centralizada en App y comunicando datos vía props. Crear componentes para: Header, Navigation, Dashboard (con MetricCard y AlertItem), InventoryTab (con ProductCard y ProductTable), MovementsTab, ProductModal, MovementModal y Footer."*
* **Recomendación IA:** La IA recomendó seguir el patrón de "Smart Component / Dumb Component" donde `App.jsx` mantiene el estado y la lógica, y los componentes hijos son puramente presentacionales.
* **Decisión del estudiante:** Se adoptó este patrón completo. Se mantuvo toda la funcionalidad idéntica, solo se reorganizó la estructura para cumplir con el requisito de "componentes reutilizables con comunicación mediante props" sin modificar el comportamiento ni el diseño visual existente.

#### Prompt 6: Actualización del README con toda la documentación requerida
* **Prompt:** *"Actualizar el README.md para incluir: nombre del proyecto, cliente y problemática, descripción de la solución, funcionalidades propuestas, estructura del proyecto, planificación de integración externa, evidencia de IA y explicación general del avance."*
* **Recomendación IA:** La IA propuso estructurar el README con secciones numeradas que correspondan directamente a los puntos de la pauta de evaluación.
* **Ajuste del estudiante:** Se redactó la problemática del cliente ficticio con datos realistas del mercado chileno y se detalló la planificación de integración con una API de precios de mercado.

---

## 8. Explicación General del Avance Realizado

### Estado actual del proyecto
El proyecto se encuentra en una **base sólida y funcional** que cumple con todos los requerimientos de la Evaluación 3:

1. **Proyecto React + Vite**: Creado y ejecutándose correctamente con estructura organizada.
2. **Componentes React modulares**: 12 componentes independientes organizados en `src/components/`, cada uno con responsabilidad única y comunicación vía props.
3. **Manejo de estado**: Uso extensivo de `useState` para formularios, filtros, modales y datos dinámicos. Uso de `useEffect` para sincronización con `localStorage`.
4. **Diseño funcional CRUD**: Crear, Consultar, Modificar y Eliminar productos con registro automático de movimientos de stock.
5. **Diseño visual premium**: Paleta orgánica, tipografía Outfit, animaciones, dark mode automático, diseño responsivo con Flexbox.
6. **Planificación de integración externa**: Documentada la futura conexión con API de precios de mercado.
7. **Control de versiones con Git**: Repositorio con ramas main, develop y feature/* con merges organizados.

### Preparación para evaluaciones futuras
La arquitectura está diseñada para crecer sin necesidad de rehacer:
- **Persistencia de datos**: Ya implementada con `localStorage`, migrable a backend/API.
- **Operaciones CRUD**: Completas y funcionales, listas para conectarse a un servicio REST.
- **Validaciones**: Estructura de formularios preparada para agregar validaciones avanzadas.
- **Manejo de errores**: La separación en componentes facilita agregar estados de carga y error.
- **Integración externa**: La lógica de datos está centralizada en `App.jsx`, facilitando la inyección de datos externos.
