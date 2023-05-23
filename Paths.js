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

// Leer archivo
const readMd = (fileMd) => new Promise((resolve, reject) => {
  fs.readFile(fileMd, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(getLinks(fileMd, data));
    }
  });
});

// Verificar el estado de los enlaces
/* const statusLinks = () => {
  const links = getLinks(route);
  links.forEach((link) => {
    fetch(link.href)
      .then((response) => {
        console.log('Link:', link.href);
        console.log('Text:', link.text);
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
};
statusLinks(); */
const statusLinks = () => {
  fetch('https://github.com/NatSama2')
    .then((response) => {
      console.log('Link:'.cyan, response.url);
      console.log('Status:'.cyan, response.status);
      console.log('Status Text:'.cyan, response.statusText);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
statusLinks();

module.exports = {
  recursive,
  readMd,
  getLinks,
};
