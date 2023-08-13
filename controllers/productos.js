const { response, request } = require("express");

const { Producto } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
  const { limite = 15, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

//obtenerCategoria - populate {}
const obtenerProducto = async (req = request, res = response) => { 
    const {id} = req.params;

    const producto = await Producto.findById(id)
    .populate("usuario", "nombre");

    res.json(producto);
}
       

;


//Crear Categorias
const crearProducto = async(req, res = response ) => {

  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() })

  if ( productoDB ) {
      return res.status(400).json({
          msg: `El producto ${ productoDB.nombre }, ya existe`
      });
  }

  // Generar la data a guardar
  const data = {
      ...body,
      nombre: body.nombre.toUpperCase(),
      usuario: req.usuario._id
  }

  const producto = new Producto( data );

  // Guardar DB
  await producto.save();

  res.status(201).json(producto);

}

//actualizarCategoria
const actualizarProducto = async( req, res = response ) => {

  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if( data.nombre ) {
      data.nombre  = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

  res.json( producto );

}

const borrarProducto = async(req, res =response ) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( productoBorrado );
}


//borrarCategoria

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
};
