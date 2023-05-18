const mongoose = require('mongoose');
 
let Schema = mongoose.Schema;
 
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true,'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
 


usuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = mongoose.model('Usuario', usuarioSchema);