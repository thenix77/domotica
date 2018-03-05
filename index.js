
var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);


var SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort('COM7', {
  baudRate: 9600
});
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

app.use(express.static('public'));

/**Creando vistas**/
app.set('views',__dirname+'/views');
app.set('view engine','ejs');


/** Rutas **/
var router = require('./router/router');
app.use(router);

/***Puerto Serial****/
port.open((err) => {
    if(err){
        console.log('error de puerto...!');
    }
    else{
        console.log('conexion correcta');
        
    }
});

parser.on('data', (data) => {
    console.log(data);
    io.emit('temp',data);
    
});


/************/
io.on('connection', function(socket){
  console.log('a user connected');

    
  socket.on('msg', (msg) =>{   //recogo mesanje
        console.log('msg chat '+ msg);
      
        io.emit('msg', msg); //envio mensaje
     });
    
});

/**********/
server.listen(3000, function(){
  console.log('Servidor estado UP');
});
