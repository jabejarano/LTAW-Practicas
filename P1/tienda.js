// -- El servidor de mi tienda

// -- * Fichero .html
// -- * Ficheros con imágenes (.jpg, .png)
// -- * Fichero .css
// --- Devolver el fichero pedido
// -- Si no localiza el fihero: PAGINA DE ERROR

// -- CREAR UN SERVIDOR
// -- Se llama a la función de retrollamada
// -- Cada vez que hay una petición

    // -- Localizar el recurso que nos piden
    // -- (sacarlo por la consola)
    // -- OBTENER el nombre del fichero válido
    
    // -- LECTURA ASÍNCRONA DEL FICHERO
        //-- Funcion de retrollamada del lecturaç

        //-- Imprimir en la consola el nombre del fichero que estoy leyendo
        //-- Si hay error, generar la página html de error

        // -- si no hay error
            // -- Devolver el contenido como respuesta
            // -- La respuesta depende del tipo de fichero
                //-- HTML: cabecera: "Content-type", "text, html"
                //-- IMAGEN: "image/jpg", "image/png"
                //-- CSS: "Text/css"
            
                //-- ¿Como puedo saber que tipo de fichero?
                //-- por la extension del fichero
                //-- Nombre fichero: "index.html", "hola.jpg"
                //-- A partir del nombre del fichero obtener su extension
                //-- "html", "css", "jpg", "png"
