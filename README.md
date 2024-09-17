## Dibuja con el Mouse 🎨🖌️🐁
**Descripción**
- Este proyecto es una aplicación web simple que permite a los usuarios dibujar en un lienzo (canvas) utilizando el mouse o una pantalla táctil.
- La aplicación está construida con Flask en el backend y utiliza HTML, CSS y JavaScript para la interfaz de usuario.

## Requisitos
- Python 3.x
- Flask
- Navegador web moderno (Chrome, Firefox, etc.)

## Instalación
- Clonación del Repositorio
- Primero, clona el repositorio a tu máquina local:

- bash
- Copiar código
- git clone https://github.com/zotel1/js-py-pintar-pantalla-mouse.git
- cd js-py-pintar-pantalla-mouse

## Instalación de Dependencias
**Instala Flask:**

Si aún no tienes Flask instalado, puedes instalarlo usando pip:

- bash
- Copiar código
- pip install Flask
**Uso**

## Ejecuta el Servidor Flask:

Una vez que hayas instalado Flask, navega al directorio del proyecto y ejecuta el servidor Flask:

bash
Copiar código
python app.py
Por defecto, el servidor se ejecutará en http://127.0.0.1:5000/.

## Accede a la Aplicación:

Abre tu navegador web y dirígete a http://127.0.0.1:5000/. 
Verás una página que te permitirá dibujar en el lienzo con el mouse o con el tacto en dispositivos móviles.

## Estructura del Proyecto
El proyecto contiene los siguientes archivos y directorios:

- app.py: Archivo principal del servidor Flask.
- static/: Carpeta que contiene archivos estáticos como CSS y JavaScript.
- main.js: Archivo JavaScript para manejar la lógica de dibujo en el lienzo.
- templates/: Carpeta que contiene archivos de plantilla HTML.
- index.html: Archivo HTML que define la estructura de la página web.

## Explicación del Código
- Archivo app.py
- Flask: Configura y ejecuta el servidor web.
- Ruta Principal: Sirve el archivo index.html cuando se accede a la raíz del sitio web.
- Archivo index.html
- HTML: Define la estructura básica de la página, incluyendo un lienzo (<canvas>) para el dibujo.
- CSS: Se enlaza un archivo CSS externo para el estilo de la página.
- JavaScript: Incluye un archivo JavaScript que maneja los eventos de dibujo en el lienzo.
- Archivo main.js

## Configuración del Canvas: Ajusta el tamaño del lienzo y configura el contexto de dibujo.
**Eventos de Mouse y Touch**: 
- Maneja los eventos para permitir el dibujo tanto con el mouse como con la pantalla táctil.
**Funciones de Dibujo**:
- Implementa la lógica para trazar líneas y dibujar en el lienzo.
