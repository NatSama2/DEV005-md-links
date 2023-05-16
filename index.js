const { existsSync }  = require('node:fs');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { log } = require('node:console');

const welcomeContent = fs.readFileSync('welcome.md', 'utf-8').cyan;
console.log(welcomeContent);

setTimeout(() => {

  // comprobar si ruta de prueba existe
if (existsSync('Pruebas/prueba.txt'))
  console.log('La ruta existe'.rainbow);
  else {
    console.log('La ruta no existe'.red)
  }

   // Leer archivo de prueba
fs.readFile('Pruebas/prueba.txt','utf8', (err, data) => {
  if (err) throw err;
  console.log(data.cyan);
});

  // Rutas de prueba
//const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Laboratoria/3er Proyecto/DEV005-data-lovers';
//const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Documentos';
//const rout = 'C:/Users/Natalie/Desktop/Documentoss';
const rout = '/Users/Natalie/Desktop/[ Nat ]/Laboratoria';
//const rout = 'Pruebas/prueba.txt';
 
// Validar si la ruta existe
if (fs.existsSync(rout)) {
  console.log('El directorio existe:'.green, rout);

  // convertir ruta a absoluta
  console.log('Ruta absoluta: '.yellow, path.resolve(rout));

  // Verificar si la ruta es un directorio
  const isDirectory = fs.lstatSync(rout).isDirectory();
  if (isDirectory) {
    // Mostrar archivos en el directorio
    const files = fs.readdirSync(rout);
    console.log('Archivos en el directorio:'.blue, files);

    // Mostrar archivos con extensión .md
    const mdFiles = files.filter((file) => path.extname(file) === '.md');
    if (mdFiles.length > 0) {
      console.log('Lista de archivos con extensión .md:'.blue);
      mdFiles.forEach((file) => {
        console.log(file.yellow);
      });
    } else {
      console.log('El directorio no contiene archivos .md'.red);
    
    // Función recursiva
    const recursive = (route) => {
      let arrayMd = [];

      if (fs.statSync(route).isFile()) {
        arrayMd.push(route);
      } else {
        const elements = fs.readdirSync(route);
        elements.forEach((element) => {
          let newRoute = path.join(route, element);
          if (fs.statSync(newRoute).isDirectory()) {
            arrayMd = arrayMd.concat(recursive(newRoute));
          } else {
            arrayMd.push(newRoute);
          }
        });
      }
      return arrayMd.filter((file) => path.extname(file) === '.md');
    };
    console.log('Lista de archivos .md encontrados de forma recursiva:'.blue);
    console.log(recursive(rout));
  }

  } else {
    console.log('La ruta no es un directorio'.red);
  }
} else {
  console.log('La ruta no existe :c'.red);
}


}, 3000);



/* module.exports = () => {
  // ...
};
 */

/* const fs2 = require('fs');

fs2.writeFileSync('index.txt', 'Hello World!');
console.log('File created'); */