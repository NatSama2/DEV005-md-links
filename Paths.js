const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const MarkdownIt = require('markdown-it');
const { JSDOM } = require('jsdom');
const { argv } = require('node:process');

const route = argv[2];
const isFiles = (route1) => fs.statSync(route1).isFile();
const dir = (route2) => fs.readdirSync(route2);
const isDirectory = (route3) => fs.lstatSync(route3).isDirectory();

// Validar si la ruta existe y transformar en absoluta
const validatePath = (rout) => {
  if (rout && fs.existsSync(rout)) {
    return path.resolve(rout);
  }
  return undefined;
};
// console.log('Ruta absoluta'.yellow, validatePath(route));

// Función recursiva
const recursive = (ruta) => {
  let arrayMd = [];
  if (isFiles(ruta)) {
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
// console.log('Lista de archivos con extensión .md:'.blue, recursive(validatePath(route)));

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
      allLinks.push({ href, text, file: files });
    }
  });
  return allLinks;
};

// Verificar el estado de los enlaces
const validateLinks = (links) => Promise.all(links.map((link) => fetch(link.href)
  .then((response) => {
    if (response.ok) {
      return ({
        Link: link.href,
        Text: link.text,
        File: link.file,
        Status: response.status,
        StatusText: response.statusText,
      });
    }
    return ({
      Link: link.href,
      Text: link.text,
      File: link.file,
      Status: response.status,
      StatusText: response.statusText,
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  })));

const statsLinks = (links, stats = false) => {
  const totalLinks = links.length;
  const uniqueLinks = new Set(links.map((zelda) => zelda.href));
  const countUniqueLinks = uniqueLinks.size;
  const brokenLinks = links.filter((result) => result.StatusText === 'Not Found').length;
  if (stats) {
    return ({
      Total: totalLinks,
      Unique: countUniqueLinks,
      Broken: brokenLinks,
    });
  } return ({
    Total: totalLinks,
    Unique: countUniqueLinks,
  });
};

// Leer archivo
const readMd = (fileMd) => new Promise((resolve, reject) => {
  fs.readFile(fileMd, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(getLinks(fileMd, data));
      validateLinks(getLinks(fileMd, data));
    }
  });
});

module.exports = {
  recursive,
  readMd,
  getLinks,
  isFiles,
  dir,
  isDirectory,
  validatePath,
  validateLinks,
  statsLinks,
  route,
};
