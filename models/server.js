const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categorias: '/api/categorias',
      buscar:'/api/buscar',
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      uploads: '/api/uploads',
    }

    
    //Conectar a Base de Datos
    this.conectarDB();

    //Middleswares
    this.middlewares();

    //rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }



  //Middlewares
  middlewares() {
    //Cors

    this.app.use(cors());

    //parseo y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));


    //Fileupload - cargar
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));

  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
