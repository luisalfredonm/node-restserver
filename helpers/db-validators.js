
const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');


const  esRoleValido = async (role = '') => {
  
  const existeRole = await Role.findOne({role})
  if (!existeRole) {
    throw new Error(`El rol ${role} no esta registrado en la B`);
  }
}




const emailExiste = async (correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El email ${correo} ya existe en la base de datos`)
    
  }

}

const existeUsuarioPorId = async( id ) => {

  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ) {
      throw new Error(`El id no existe ${ id }`);
  }
}

const existeCategoriaPorId = async( id ) => {

  // Verificar si la categoria existe
  const existeCategoria = await Categoria.findById(id);
  if ( !existeCategoria ) {
      throw new Error(`El id no existe ${ id }`);
  }
}

const existeProductoPorId = async( id ) => {

  // Verificar si la categoria existe
  const existeProducto = await Producto.findById(id);
  if ( !existeProducto ) {
      throw new Error(`El id no existe ${ id }`);
  }
}



//Validar las colecciones permitidas

const coleccionesPermitidas =  (coleccion ='', colecciones= []) => {

  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(`la coleccion ${coleccion} no espermitida, ${colecciones}`)
  }

  return true;

}




module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  coleccionesPermitidas
}
  