//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8090;

let user = 0;
username = [];

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  
  res.sendFile(__dirname + "/public/chat.html");
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {

  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  user = user + 1;

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
  });  

  msg_inf1 = "BIENVENIDO AL CHAT!!";
  socket.send('<p style="color:blue">'+ msg_inf1 +'</p>');

  msg_inf2 = "** NUEVO USUARIO CONECTADO **";
  io.send('<p style="color:blue">'+ msg_inf2 +'</p>');

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);

    if (msg.startsWith('/')) {
      switch(msg){
        case '/help':
          const message_listcommand = '/help --> Lista con todos los comandos soportados.' + '<br>' +
                 '/list --> Número de usuarios conectados.' + '<br>' +
                 '/hello --> El servidor nos devolverá el saludo.' + '<br>' +
                 '/date --> Fecha actual.';

          socket.send(message_listcommand);
          break;
        case '/hello':
          const message_hello = '¡¡Bienvenido al chat!!';
          socket.send(message_hello);
          break;
        case '/date':
          d = new Date();         
          const message_date = 'Fecha: ' + d.getDate() +'/'+ (d.getMonth()+1) +'/' + d.getFullYear();
          socket.send(message_date);
          break;
       case '/list': 
          const message_users = 'Usuarios conectados: ' + user;
          socket.send(message_users);
          break;
        default:
          socket.send('El comando es incorrecto!!. Intoduzca /help para visualizar los comandos.');
          return;
      }
    }else{
      if(user){
        var index = username.indexOf(socket.id);
        io.send(msg);
      }
    }

  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);