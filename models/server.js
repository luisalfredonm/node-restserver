const express = require("express");
var cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

//Middleswares
this.middlewares();
 



//rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    //Cors

    this.app.use(cors())

    //parseo y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath , require('../routes/usuarios'));
   
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
