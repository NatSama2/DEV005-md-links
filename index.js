const fs = require('fs');
const welcomeContent = fs.readFileSync('welcome.md', 'utf-8');
console.log(welcomeContent);

const { existsSync }  = require('node:fs');

const path = require('path');
var colors = require('colors');

if (existsSync('Pruebas/prueba.txt'))
  console.log('La ruta existe'.rainbow);
  else {
    console.log('La ruta no existe'.red)
  }

  // validar si la ruta existe
//const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Laboratoria/3er Proyecto/DEV005-data-lovers';
const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Documentos';
const filesExist = fs.existsSync(rout);
console.log('ruta existe', filesExist);

// convertir ruta a absoluta
console.log(path.join(rout));

// mostrar archivos con extesion .md
const readFiles = fs.readdirSync(rout);
console.log('/Filenames with the .md extension:');
readFiles.forEach(file => {
  if (path.extname(file) === '.md') {
    console.log(file);
  } 
  else {
   'Directorio no contiene archivos .md';
  }
})



fs.readFile('Pruebas/prueba.txt','utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});


/* module.exports = () => {
  // ...
};
 */

/* const fs2 = require('fs');

fs2.writeFileSync('index.txt', 'Hello World!');
console.log('File created'); */