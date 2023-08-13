const path = require("path");
const { v4: uuidv4 } = require('uuid');



const subirArchivo = (files, extensionesValidas = ["png", "jpg", "jpeg", "gif", "JPG"], carpeta = '') => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];



    if (!extensionesValidas.includes(extension)) {

       return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
    
    }

    //Sirve para subir el archivo

    const nombreTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, (err) => {
      if (err) {reject(err);} 

      resolve(nombreTemp);
    });
  });
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
};

module.exports = {
  subirArchivo,
};
