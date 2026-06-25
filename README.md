# NutriStock - Gestión de Stock de Frutos Secos

## Descripción del Proyecto
**NutriStock** es una aplicación web responsiva diseñada para la gestión de inventario en tiendas de frutos secos, semillas y frutas deshidratadas. El sistema permite registrar las entradas (abastecimiento por proveedores) y salidas (ventas en local, mermas o despachos web) de productos, además de mantener un catálogo detallado con sus precios de compra y venta.

Su característica principal es el **sistema de alertas de abastecimiento**, el cual notifica de forma visual y destacada cuándo un producto ha alcanzado o descendido de su nivel de stock mínimo configurado. Esto permite a los encargados del negocio reabastecerse de forma ágil y oportuna (utilizando los botones de acción rápida de entrada de stock), evitando quiebres de inventario.

El proyecto está construido bajo una arquitectura moderna utilizando **React** y **Vite**, cumpliendo además con los principios semánticos de HTML5 y un diseño visual coherente basado en Flexbox y CSS personalizado con una paleta de colores orgánicos y cálidos inspirados en frutos secos (tonos almendra, pistacho, nuez y ámbar).

---

## Estructura de Carpetas
A continuación, se detalla la estructura física del proyecto organizado según buenas prácticas de desarrollo front-end:

```text
fronenteva3/
├── .git/                      # Repositorio Git local (con ramas main, develop, feature/*)
├── node_modules/              # Dependencias del proyecto instaladas vía npm
├── public/                    # Archivos estáticos públicos
│   ├── favicon.svg            # Icono del sitio
│   └── icons.svg              # Set de iconos vectoriales SVG
├── src/                       # Directorio principal del código fuente
│   ├── assets/                # Recursos de imágenes y multimedia
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.css                # Archivo auxiliar de estilos (limpio de conflictos)
│   ├── App.jsx                # Componente principal de React con la lógica, estados e interfaz semántica
│   ├── index.css              # Hoja de estilos CSS global (Layout, Flexbox, variables, componentes y media queries)
│   └── main.jsx               # Punto de entrada de renderizado de la aplicación en el DOM
├── .gitignore                 # Configuración de exclusiones de archivos en Git
├── .oxlintrc.json             # Configuración del linter Oxlint
├── index.html                 # Plantilla HTML5 principal
├── package.json               # Configuración de dependencias y scripts del proyecto
├── package-lock.json          # Registro exacto de versiones de paquetes
├── README.md                  # Documentación del proyecto (este archivo)
└── vite.config.js             # Configuración del empaquetador Vite
```

---

## Lista de Prompts Utilizados Durante el Desarrollo

Para el desarrollo guiado de este proyecto, se utilizaron los siguientes prompts secuenciales para estructurar y construir la aplicación:

### Prompt 1: Creación del proyecto base con Vite y React
* **Prompt:** *"Configurar un nuevo proyecto de React en limpio usando Vite en el directorio raíz en modo no interactivo."*
* **Explicación de uso:** Se usó para inicializar el scaffolding del proyecto de forma rápida utilizando las plantillas por defecto provistas por Vite y asegurar que contara con las dependencias necesarias.

### Prompt 2: Creación de la estructura de ramas Git
* **Prompt:** *"Inicializar un repositorio Git, crear la rama principal `main`, luego crear la rama de desarrollo `develop` y desde ahí crear la rama `feature/estructura` para comenzar a trabajar."*
* **Explicación de uso:** Se aplicó para establecer el flujo de trabajo de Git Flow requerido en la pauta de evaluación. Esto permite separar las etapas de desarrollo y mantener un historial organizado.

### Prompt 3: Implementación de la estructura semántica HTML5 y estados React
* **Prompt:** *"En la rama `feature/estructura`, desarrollar en `App.jsx` una aplicación de gestión de inventario para una tienda de frutos secos que contenga un header con el logo del negocio, barra de navegación, panel general con métricas, alertas críticas de abastecimiento para stock inferior al mínimo, pestaña de inventario de stock en cuadrícula y tabla, historial de movimientos de entrada/salida de stock, formularios interactivos en ventana modal para registrar productos y movimientos, y un footer con datos de la evaluación. Usar tags semánticos como `header`, `nav`, `main`, `section` y `footer`."*
* **Explicación de uso:** Se usó para plasmar toda la estructura lógica y los componentes de UI interactivos en React (CRUD, LocalStorage para persistencia de datos y la funcionalidad esencial del sistema de stock requerido).

### Prompt 4: Diseño estético y maquetación responsiva con CSS y Flexbox
* **Prompt:** *"En la rama `feature/estilos`, implementar en `index.css` un sistema de diseño premium, responsivo y adaptativo. Usar Flexbox para alinear los elementos de la navegación, tarjetas de métricas, alertas y productos. Crear una paleta de colores orgánicos y cálidos inspirados en frutos secos (almendra, castaño, pistacho, ámbar y tonos café de alta visibilidad). Incluir un diseño ordenado, tipografía moderna importada de Google Fonts y efectos de transición suave para los botones."*
* **Explicación de uso:** Se utilizó para cumplir con los requerimientos estéticos de la evaluación ("diseño ordenado y coherente", "uso de Flexbox" y "uso de CSS externo") proporcionando una interfaz web profesional e intuitiva.

### Prompt 5: Refinamiento de interactividad y fusiones Git
* **Prompt:** *"Refinar las animaciones de botones y el efecto de escala activa en la interacción del usuario. Realizar los commits progresivos y fusionar las ramas mediante merges no fast-forward (`--no-ff`) de `feature/estructura` a `develop`, `feature/estilos` a `develop`, y finalmente de `develop` a `main` para evidenciar el control de versiones."*
* **Explicación de uso:** Se empleó para pulir las micro-interacciones de la experiencia de usuario y realizar las operaciones Git finales, consolidando el trabajo en la rama `main` de manera limpia y rastreable.
