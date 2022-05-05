let socket1 = new WebSocket("ws://148.213.177.65:6969");

const socket = io();

//DOM elements
let mensaje = document.getElementById('message');
let usuario = document.getElementById('username');
let boton = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

boton.addEventListener('click',function(){
    socket.emit('mensaje', {
        mensaje: mensaje.value,
        usuario: usuario.value
    });
    mensaje.value='';
});

mensaje.addEventListener('keypress', function(){
    socket.emit('escrito', usuario.value);
});

socket.on('mensaje', function(data){
    actions.innerHTML = '';
    output.innerHTML +=`<p> 
    <strong>${data.usuario}</strong>:${data.mensaje}
    </p>`;
    window.scrollTo(0,document.body.scrollHeight)
});

socket.on('escrito',function(data){
    actions.innerHTML = `<p> 
    <em>${data} esta escribiendo.......</em>
    </p>`;
});