

const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const { crearProducto, obtenerProductos,obtenerProducto,actualizarProducto, borrarProducto} = require("../controllers/productos");
const { existeProductoPorId } = require("../helpers/db-validators");



const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerProductos
)


//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
   
], obtenerProducto)


//Crear categorias - Privado- cualquier persona con un token valido
router.post('/', [
validarJWT,
check('nombre','El nombre es obligatorio').not().isEmpty(),
validarCampos
], crearProducto)

//Actualizar - privado - cualquiera con token valido

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
],borrarProducto);




module.exports = router;
