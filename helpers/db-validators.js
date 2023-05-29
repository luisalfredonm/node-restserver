
const Role = require('../models/role');
const Usuario = require('../models/usuario');

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




module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
}
  