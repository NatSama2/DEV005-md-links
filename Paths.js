const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');

const route = process.argv[2];
const isFile = (route1) => fs.statSync(route1).isFile();
const dir = (route2) => fs.readdirSync(route2);
const isDirectory = (route3) => fs.lstatSync(route3).isDirectory();

// Validar si la ruta existe y transformar en absoluta
const validatePath = (rout) => {
  if (fs.existsSync(rout)) {
    return path.resolve(rout);
  }
  return undefined;
};
// console.log(validatePath(route));

// Función recursiva
const recursive = (ruta) => {
  let arrayMd = [];
  if (isFile(ruta)) {
    arrayMd.push(ruta);
  } else if (isDirectory(ruta)) {
    const elements = dir(ruta);
    elements.forEach((element) => {
      const newRoute = path.join(ruta, element);
      arrayMd = arrayMd.concat(recursive(newRoute));
    });
  }
  return arrayMd.filter((file) => path.extname(file) === '.md');
};
console.log('Lista de archivos con extensión .md:'.blue, recursive(validatePath(route)));

// obtener links
const getLinks = (files, data) => {
  const allLinks = [];
  const md = new MarkdownIt();
  const content = md.render(data);
  const dom = new JSDOM(content);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const text = link.textContent;
    if (href.startsWith('https')) {
      allLinks.push({ href, text, files });
    }
  });
  return allLinks;
};

// Verificar el estado de los enlaces
const statusLinks = (links) => {
  links.forEach((link) => {
    fetch(link.href)
      .then((response) => {
        if (response.ok) {
          console.log('Link:'.cyan, link.href);
          console.log('Text:'.cyan, link.text);
          console.log('Status:'.cyan, response.status);
          // eslint-disable-next-line prefer-template
          console.log('Status Text:'.cyan, response.statusText + '\n');
        } else {
          console.log('Link:'.red, link.href);
          console.log('Text:'.red, link.text);
          console.log('Status:'.red, response.status);
          // eslint-disable-next-line prefer-template
          console.log('Status Text:'.red, response.statusText + '\n');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
};

// Leer archivo
const readMd = (fileMd) => new Promise((resolve, reject) => {
  fs.readFile(fileMd, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(getLinks(fileMd, data));
      statusLinks(getLinks(fileMd, data));
    }
  });
});

module.exports = {
  recursive,
  readMd,
  getLinks,
};
