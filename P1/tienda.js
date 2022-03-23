const http = require('http');

const PUERTO = 9090;

//-- Texto HTML de la página principal
const pagina_main = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: lightblue">
    <h1 style="color: green">MI TIENDA</h1>
</body>
</html>
`

//-- Texto HTML de la página de error
const pagina_error = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi tienda</title>
</head>
<body style="background-color: red">
    <h1 style="color: white">ERROR!!!!</h1>
</body>
</html>
`

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");

    //-- Valores de la respuesta por defecto
    let code = 200;
    let code_msg = "OK";
    let page = pagina_main;

    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    const url = new URL(req.url, 'http://' + req.headers['host']);
    console.log(url.pathname);

    //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    if (url.pathname != '/') {
        code = 404;
        code_msg = "Not Found";
        page = pagina_error;
    }

    //-- Generar la respusta en función de las variables
    //-- code, code_msg y page
    res.statusCode = code;
    res.statusMessage = code_msg;
    res.setHeader('Content-Type','text/html');
    res.write(page);
    res.end();
});

server.listen(PUERTO);

console.log("Ejemplo 7. Escuchando en puerto: " + PUERTO);

















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
