const {
  pathExists,
  absolutePath,
  isDirectory,
  mdFiles,
  recursive
} = require('./index.js');

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Validar si la ruta existe
    if (pathExists(path)) {
      console.log('La ruta existe:'.green, path);

      // Convertir ruta a absoluta
      const absPath = absolutePath(path);
      console.log('Ruta absoluta: '.yellow, absPath);

      // Verificar si la ruta es un directorio
      if (isDirectory(absPath)) {
        // Mostrar archivos en el directorio
        const files = fs.readdirSync(absPath);
        console.log('Archivos en el directorio:'.blue, files);

        // Mostrar archivos con extensión .md
        if (mdFiles.length > 0) {
          console.log('Lista de archivos con extensión .md:'.blue);
          mdFiles.forEach((file) => {
            console.log(file.yellow);
          });
        } else {
          console.log('El directorio no contiene archivos .md'.red);
          
        // Función recursiva
        const recursiveMdFiles = recursive(absPath);
        console.log('Lista de archivos .md encontrados de forma recursiva:'.blue);
        console.log(recursiveMdFiles);
      }
      } else {
        console.log('La ruta no es un directorio'.red);
      }
    } else {
      console.log('La ruta no existe :c'.red);
    }
  });
};

module.exports = mdLinks;