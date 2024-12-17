// filepath: start/socket.ts

import Ws from "App/Services/Ws";

Ws.boot()
/**
* Listen for incoming socket connections
*/
Ws.io.on('connection', (socket) => {
    let id = socket.id;
    console.log("nuevo dispositivo conectado")
    console.log("se conectó " + id)
})