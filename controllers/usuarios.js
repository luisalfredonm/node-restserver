const { response, request } = require("express");

const bcryptjs = require("bcryptjs");

// Usuario en mayuscula para crear modelos
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 15, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, email, password, role } = req.body;
  const usuario = new Usuario({ nombre, email, password, role });

  //Encritarp la contrase;a
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD

  await usuario.save();

  res.json({
    msg: "post API controllador",
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;

  const { _id, password, google, email, ...resto } = req.body;
  //TODO validar contra base de datos

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "Patch API controllador",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;

  //fisicamente
  //  const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  //trer informacion del usuario autenticado

  const usuarioAutenticado = req.usuario;



  res.json({
    usuario,
    usuarioAutenticado,
    uid,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
