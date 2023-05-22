const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');

const route = process.argv[2];
const file = (route) => fs.statSync(route).isFile();
const dir = (route) => fs.readdirSync(route);
// const isDirectory = (route) => fs.lstatSync(route).isDirectory();

// Validar si la ruta existe y transformar en absoluta
const validatePath = (rout) => {
  if (fs.existsSync(rout)) {
    return path.resolve(rout);
  }
  return undefined;
};
// console.log(validatePath(route));

// Función recursiva
const recursive = (route) => {
  let arrayMd = [];
  if (file(route)) {
    arrayMd.push(route);
  } else {
    const elements = dir(route);
    elements.forEach((element) => {
      const newRoute = path.join(route, element);
      arrayMd = arrayMd.concat(recursive(newRoute));
    });
  }
  return arrayMd.filter((file) => path.extname(file) === '.md');
};
console.log('archivos', recursive(route));

// obtener links
const getLinks = (files) => {
  const allLinks = [];
  const md = new markdownIt();
  const content = md.render(files);
  const dom = new JSDOM(content);
  const { document } = dom.window;
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const text = link.textContent;
    // const files = path.resolve(route);
    if (href.startsWith('https')) {
      allLinks.push({ href, text, files });
    }
  });
  return allLinks;
};

// Leer archivo
const readMd = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(getLinks(data));
    }
  });
});

module.exports = {
  recursive,
  readMd,
  getLinks,
};
