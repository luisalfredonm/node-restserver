
const mongoose = require('mongoose');
 
let Schema = mongoose.Schema;
 
let RoleSchema = new Schema({
    role: {
        type: String,
        required: [true,'El rol es obligatorio']
    }
});
 
module.exports = mongoose.model('Role', RoleSchema);


