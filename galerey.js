const express = require('express');
const cluster = require('cluster');
const PORT = 3001;
const {config} = require('./config/index');

const app = express();



app.get('/saludo', (req, res) => {
    res.send(saludo.repeat(1000));
});

if(modo_cluster)


app.listen(PORT, () => {  
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
