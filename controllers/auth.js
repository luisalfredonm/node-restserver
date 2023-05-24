const { response } = require("express");
const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si el emaiil existe
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario no encontrado - correo",
        email: email,
      });
    }

    //vefiricar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario no encontrado - estado == false",
      });
    }
    //vefircar la contrase
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "usurio/ pass no son correctos ----- password.",
      });
    }

    //Generar Webtoken

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};




module.exports = {
  login,
};
