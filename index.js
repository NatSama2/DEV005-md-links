const { existsSync }  = require('node:fs');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

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

  // validar si la ruta existe
const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Laboratoria/3er Proyecto/DEV005-data-lovers';
//const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Documentos';
//const rout = 'C:/Users/Natalie/Desktop/Documentoss';
fs.stat(rout, function(err, stat) {
  if(err == null) {
    const files = fs.readdirSync(rout);
    console.log('El directorio existe:'.green, rout);
    console.log('Archivos en el directorio:'.blue, files);
    
    // convertir ruta a absoluta
    console.log('Ruta absoluta: '.yellow, path.resolve(rout));

    // mostrar archivos con extesion .md
    const readFiles = fs.readdirSync(rout);
    const mdFiles = readFiles.filter(file => path.extname(file) === '.md');
if (mdFiles.length > 0) {
  console.log('Lista de archivos con extensión .md:'.blue);
  mdFiles.forEach(file => {
    console.log(file.yellow);
  });
} else {
  console.log('Directorio no contiene archivos .md'.red);
}

// Si no es ruta válida 
  } else if(err.code === 'ENOENT') {
      console.log('El archivo no existe :c'.red);
  } else {
      console.log('Some other error: ', err.code);
  }
});


}, 3000);

/* module.exports = () => {
  // ...
};
 */

/* const fs2 = require('fs');

fs2.writeFileSync('index.txt', 'Hello World!');
console.log('File created'); */