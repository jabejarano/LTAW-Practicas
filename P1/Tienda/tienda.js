//-- Importo los módulos http,url y fs
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Definir el puerto a utilizar
const PUERTO = 9090; 

//-- Crear el servidor
const server = http.createServer((req, res) => {
  
  const myURL = new URL(req.url, 'http://' + req.headers['host']);
  console.log("Recurso recibido: " + myURL.pathname);

  //-- Indicamos que se ha recibido una petición
  console.log("----------> Petición recibida:",myURL);

  var mime = {
    '/' : 'text/html',
    'html' : 'text/html',
    'css'  : 'text/css',
    'jfif'  : 'image/jfif',
    'jpeg'  : 'image/jpeg',
    'jpg'  : 'image/jpg',
    'png'  : 'image/png',
    'gif'  : 'image/gif',
  
  };

  let filename = ""
  
  //-- Obtenemos el fichero correspondiente.
  if(myURL.pathname == '/'){
    filename += "./tienda.html"; //-- Página principal de la tienda
  }else{
    filename += "." + myURL.pathname;
  }
  console.log("Filename:",filename);

  // -- Buscamos el "." final para poder indicar que tipo mime es
  let hastaPunto = myURL.pathname.lastIndexOf(".");
  let type = myURL.pathname.slice(hastaPunto+1);
  console.log("Tipo de mime:",mime[type]);

  //-- Valores de la respuesta por defecto
  let code = 200;
  let message = "OK";

  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
     //-- Fichero no encontrado. Devolver mensaje de error
    if ((err|| (filename == 'error.html'))) {
      code = 404;
      message = "Not Found";
      data = fs.readFileSync('./tienda_error.html')
      res.writeHead(code, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }else{
      res.statusCode = code; 
      res.statusMessage = message;
      res.writeHead(code, {'Content-Type': mime[type]});
      res.write(data);
      res.end();
    }
    
  });
  
  //console.log("Contenido del fichero: \n")
  //console.log(data); 
   
});


//-- Activar el servidor:
server.listen(PUERTO);

console.log(" Server activado!. Escuchando en puerto: " + PUERTO);




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
