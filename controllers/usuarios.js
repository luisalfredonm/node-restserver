

const { response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
  
      msg: 'get API controllador',
      query
    });
  }


  const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({
  
      msg: 'post API controllador',
      body
    });
  };

  const usuariosPut = (req, res = response) => {

    const { id } = req.params;
    res.json({
  
      msg: 'Put API controllador',
      id
    });
  };

  const usuariosPatch = (req, res = response) => {
    res.json({
  
      msg: 'Patch API controllador'
    });
  };

  const usuariosDelete= (req, res = response) => {
    res.json({
  
      msg: 'delete API controllador'
    });
  };

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete

  }


