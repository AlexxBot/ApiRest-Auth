import app from './app'

import './mercado-pago'

const http = require("http")
const server = http.createServer(app)
//
const io = require('socket.io')(server, {

    /* path: '/socket.io',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false, */
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('un usuario se conecto al socket')

    //sockets para la transmision de video

    //el signal data sirve para hacer al handshake
    socket.emit("sendId", socket.id)

    socket.on('transmitir', (data) => {
        console.log(`el usuario ${data.from} quiere transmitir`)
        io.emit("streaming", { room: data.room, signal: data.signalData, from : data.from, email: data.email})
    })

    socket.on('recibido', (data) => {
        console.log(`el usuario ${data.socketId} se quiere unir a la trasmision`)
        io.emit('addViewer', data.signal)
    })

    //este bloque de codigo de sockets es para el chat en vivo

    socket.on('sendMensaje', message => {
        console.log('se emitio este mensaje : ', message.payload,' de ', message.from)
        
        const fecha = Date.now().toString();

        console.log('mensaje enviado con id ', `${message.from}-${fecha}`)
        io.emit('receiveMessage', {id : `${message.from}-${fecha}`, from : message.from, mensaje: message.payload})
    })

})


server.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
    }
);

export default server
