const { existsSync } = require('node:fs');
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const markdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const { readMD, readMDs } = require('./Md-Links.js');

const welcomeContent = fs.readFileSync('welcome.md', 'utf-8').cyan;
console.log(welcomeContent);

setTimeout(() => {
  // Rutas de prueba
  // const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Laboratoria/3er Proyecto/DEV005-data-lovers';
  // const rout = 'C:/Users/Natalie/Desktop/[ Nat ]/Documentos';
  // const rout = 'C:/Users/Natalie/Desktop/Documentoss';
  // const rout = '/Users/Natalie/Desktop/[ Nat ]/Laboratoria';
  // const rout = 'Pruebas/prueba.txt';
  // const rout = 'Pruebas';
  // const rout = 'Pruebas/Directorio/Archivos2md';
  const rout = process.argv[2];

  // obtener links
  const getLinks = (files) => {
    const allLinks = [];
    files.forEach((e) => {
      const md = new markdownIt();
      const content = md.render(e);
      const dom = new JSDOM(content);
      const { document } = dom.window;
      const links = document.querySelectorAll('a');

      links.forEach((link) => {
        const href = link.getAttribute('href');
        const text = link.textContent;
        const file = path.resolve(rout);
        if (href.startsWith('https')) {
          allLinks.push({ href, text, file });
        }
      });
    });
    return allLinks;
  };

  // Leer los archivos .md
  const readAndProcessMDs = (files) => {
    readMDs(files)
      .then((data) => {
        console.log('Datos leídos de los archivos Markdown:'.yellow);
        console.log(getLinks(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Validar si la ruta existe
  if (fs.existsSync(rout)) {
    console.log('El directorio existe:'.bgMagenta, rout);

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
          readAndProcessMDs([path.join(rout, file)]);
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
              const newRoute = path.join(route, element);
              arrayMd = arrayMd.concat(recursive(newRoute));
            });
          }
          return arrayMd.filter((file) => path.extname(file) === '.md');
        };
        const result = recursive(rout);

        if (result.length === 0) {
          console.log('No se encontraron archivos .md de forma recursiva.'.red);
        } else {
          console.log('Lista de archivos .md encontrados de forma recursiva:'.blue);
          console.log(result);
          readAndProcessMDs(result);
        }
      }
    } else {
      console.log('La ruta no es un directorio'.red);
    }
  } else {
    console.log('La ruta no existe :c'.red);
  }
}, 3000);

module.exports = {
  readMD,
  readMDs,
};

/* const fs2 = require('fs');

fs2.writeFileSync('index.txt', 'Hello World!');
console.log('File created'); */

// comprobar si ruta de prueba existe
if (existsSync('Pruebas/prueba.txt')) {
  console.log('La ruta existe'.rainbow);
} else {
  console.log('La ruta no existe'.red);
}

// Leer archivo de prueba
fs.readFile('Pruebas/prueba.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data.cyan);
});
