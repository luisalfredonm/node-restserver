const { Router } = require("express");
const { check } = require("express-validator");


const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole
 
} = require("../middlewares");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");


const { esRoleValido, 
        emailExiste, 
        existeUsuarioPorId } = require("../helpers/db-validators");


const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo").custom(emailExiste),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put("/:id",[
  check('id','no es un ID valido').isMongoId(),
   check('id').custom(existeUsuarioPorId),
   check("role").custom(esRoleValido),
  validarCampos,
], usuariosPut);

router.patch("/", usuariosPatch);

router.delete("/:id", [
  validarJWT,
  // esAdminRole,

  tieneRole('ADMIN_ROLE', 'NOSE_ROLE'),
  check('id','no es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

module.exports = router;
