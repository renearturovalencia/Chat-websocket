const path= require('path');
const express=require('express');
const app=express();

//settings
app.set('port', process.env.PORT || 6969);

//static file
app.use(express.static(path.join(__dirname, 'public')));

//start the server
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});


//websocket
const socket = require('socket.io');
const io = socket(server);

io.on('connection',(socket)=>{
    console.log('Nuevo usuario');

    socket.on('mensaje', (data) =>{
        io.sockets.emit('mensaje', data)
    });
    
    socket.on('escrito',(data)=>{
        socket.broadcast.emit('escrito',data)
    });
});